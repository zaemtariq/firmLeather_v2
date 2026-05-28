import crypto from "node:crypto";
import { NextResponse } from "next/server";

const CAPTCHA_SECRET =
  process.env.CAPTCHA_SECRET ||
  process.env.RESEND_API_KEY ||
  "firmleather-local-captcha-secret";
const captchaTtlMs = 10 * 60 * 1000;

const base64UrlEncode = (value) =>
  Buffer.from(value).toString("base64url");

const signPayload = (payload) =>
  crypto.createHmac("sha256", CAPTCHA_SECRET).update(payload).digest("base64url");

const createAnswerHash = ({ answer, salt }) =>
  crypto
    .createHmac("sha256", CAPTCHA_SECRET)
    .update(`${String(answer).trim().toLowerCase()}:${salt}`)
    .digest("base64url");

export async function GET() {
  const firstNumber = crypto.randomInt(2, 10);
  const secondNumber = crypto.randomInt(2, 10);
  const answer = String(firstNumber + secondNumber);
  const salt = crypto.randomUUID();
  const payload = JSON.stringify({
    answerHash: createAnswerHash({ answer, salt }),
    expiresAt: Date.now() + captchaTtlMs,
    salt,
  });
  const encodedPayload = base64UrlEncode(payload);

  return NextResponse.json({
    question: `What is ${firstNumber} + ${secondNumber}?`,
    token: `${encodedPayload}.${signPayload(encodedPayload)}`,
  });
}
