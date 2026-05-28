import crypto from "node:crypto";
import { NextResponse } from "next/server";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "inquire@firmleather.com";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ||
  "FirmLeather Website <onboarding@resend.dev>";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CAPTCHA_SECRET =
  process.env.CAPTCHA_SECRET ||
  process.env.RESEND_API_KEY ||
  "firmleather-local-captcha-secret";

const rateLimitWindowMs = 10 * 60 * 1000;
const maxRequestsPerWindow = 5;
const submissionsByIp = new Map();

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const cleanText = (value = "", maxLength = 2000) =>
  String(value).replace(/\s+/g, " ").trim().slice(0, maxLength);

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const signPayload = (payload) =>
  crypto
    .createHmac("sha256", CAPTCHA_SECRET)
    .update(payload)
    .digest("base64url");

const createAnswerHash = ({ answer, salt }) =>
  crypto
    .createHmac("sha256", CAPTCHA_SECRET)
    .update(`${String(answer).trim().toLowerCase()}:${salt}`)
    .digest("base64url");

const getClientIp = (request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  request.headers.get("x-real-ip") ||
  "unknown";

const checkRateLimit = (ip) => {
  const now = Date.now();
  const record = submissionsByIp.get(ip);

  if (!record || now - record.startedAt > rateLimitWindowMs) {
    submissionsByIp.set(ip, { count: 1, startedAt: now });
    return true;
  }

  if (record.count >= maxRequestsPerWindow) return false;

  record.count += 1;
  return true;
};

const validatePayload = (payload) => {
  const name = cleanText(payload.name, 120);
  const company = cleanText(payload.company, 160);
  const email = cleanText(payload.email, 180).toLowerCase();
  const message = cleanText(payload.message, 3000);
  const inquiryType = cleanText(payload.inquiryType, 120);
  const startedAt = Number(payload.startedAt);
  const website = cleanText(payload.website, 200);
  const attachmentName = cleanText(payload.attachmentName, 200);
  const attachmentType = cleanText(payload.attachmentType, 120);
  const attachmentBase64 = payload.attachmentBase64
    ? String(payload.attachmentBase64)
    : "";

  const errors = {};

  if (website) errors.form = "Unable to submit this inquiry.";
  if (!name || name.length < 2) errors.name = "Enter your full name.";
  if (!company || company.length < 2) errors.company = "Enter your company.";
  if (!emailPattern.test(email)) errors.email = "Enter a valid email address.";
  if (!message || message.length < 20) {
    errors.message = "Tell us a little more about your requirements.";
  }
  if (!startedAt || Date.now() - startedAt < 3000) {
    errors.form = "Please try again in a moment.";
  }

  return {
    values: {
      name,
      company,
      email,
      message,
      inquiryType,
      attachmentName,
      attachmentType,
      attachmentBase64,
    },
    errors,
  };
};

const verifyTextCaptcha = ({ answer, token }) => {
  if (!answer || !token || !token.includes(".")) return false;

  const [encodedPayload, signature] = token.split(".");
  const expectedSignature = signPayload(encodedPayload);
  const signatureBuffer = Buffer.from(signature);
  const expectedSignatureBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedSignatureBuffer.length) {
    return false;
  }

  if (!crypto.timingSafeEqual(signatureBuffer, expectedSignatureBuffer)) {
    return false;
  }

  let payload;

  try {
    payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8"),
    );
  } catch {
    return false;
  }

  if (!payload.expiresAt || Date.now() > payload.expiresAt) return false;

  const answerHash = createAnswerHash({
    answer,
    salt: payload.salt,
  });
  const answerBuffer = Buffer.from(answerHash);
  const expectedAnswerBuffer = Buffer.from(payload.answerHash || "");

  if (answerBuffer.length !== expectedAnswerBuffer.length) return false;

  return crypto.timingSafeEqual(answerBuffer, expectedAnswerBuffer);
};

const buildEmailHtml = ({ name, company, email, message, inquiryType }) => `
  <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1c1917">
    <h2>New FirmLeather Inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Company:</strong> ${escapeHtml(company)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Inquiry Type:</strong> ${escapeHtml(inquiryType)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  </div>
`;

const sendEmail = async (values) => {
  if (!RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY");
  }

  const payload = {
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    reply_to: values.email,
    subject: `Inquiry from ${values.company}`,
    text: [
      "Inquiry Details",
      `Name: ${values.name}`,
      `Company: ${values.company}`,
      `Email: ${values.email}`,
      `Inquiry Type: ${values.inquiryType}`,
      "",
      values.message,
    ].join("\n"),
    html: buildEmailHtml(values),
  };

  if (values.attachmentBase64) {
    payload.attachments = [
      {
        filename: values.attachmentName,
        content: values.attachmentBase64,
      },
    ];
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Email provider failed: ${details}`);
  }
};

export async function POST(request) {
  try {
    const ip = getClientIp(request);

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { message: "Too many attempts. Please try again later." },
        { status: 429 },
      );
    }

    const payload = await request.json();
    const { values, errors } = validatePayload(payload);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const captchaOk = verifyTextCaptcha({
      answer: payload.captchaAnswer,
      token: payload.captchaToken,
    });

    if (!captchaOk) {
      return NextResponse.json(
        { errors: { captcha: "The verification answer does not match." } },
        { status: 400 },
      );
    }

    await sendEmail(values);

    return NextResponse.json({
      message: "Inquiry sent successfully.",
    });
  } catch (error) {
    console.error("Contact inquiry failed:", error);

    return NextResponse.json(
      { message: "Unable to send inquiry right now." },
      { status: 500 },
    );
  }
}
