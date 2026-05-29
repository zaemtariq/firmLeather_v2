"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  Factory,
  Send,
  Mail,
  Phone,
  Paperclip,
  X,
  FileText,
} from "lucide-react";

const FEATURES = [
  {
    icon: Factory,
    title: "Custom Manufacturing",
    description:
      "Private label leather production tailored to your specifications, finishes, branding, and wholesale needs.",
  },
  {
    icon: Send,
    title: "Global Shipping",
    description:
      "Reliable international logistics with secure worldwide delivery and competitive export pricing.",
  },
];

const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024;

const createInitialForm = () => ({
  name: "",
  company: "",
  email: "",
  message: "",
  website: "",
  startedAt: Date.now(),
  attachment: null,
});

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function ContactSection() {
  const [form, setForm] = useState(createInitialForm);
  const [captcha, setCaptcha] = useState({
    answer: "",
    question: "",
    token: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [attachmentError, setAttachmentError] = useState("");
  const fileInputRef = useRef(null);
  const attachmentPreviewUrl = useMemo(() => {
    if (!form.attachment?.type.startsWith("image/")) return null;
    return URL.createObjectURL(form.attachment);
  }, [form.attachment]);

  const loadCaptcha = useCallback(
    async (force = false) => {
      if (captcha.token && !force) return;

      try {
        const response = await fetch("/api/contact/captcha", {
          cache: "no-store",
        });
        const data = await response.json();

        setCaptcha({
          answer: "",
          question: data.question || "",
          token: data.token || "",
        });
      } catch {
        setErrors((prev) => ({
          ...prev,
          captcha: "Unable to load verification. Please refresh the page.",
        }));
      }
    },
    [captcha.token],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const nextErrors = { ...prev };
        delete nextErrors[name];
        return nextErrors;
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_ATTACHMENT_SIZE) {
      setAttachmentError("Attachment must be 5MB or smaller.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setAttachmentError("");
    setForm((prev) => ({
      ...prev,
      attachment: file,
    }));
  };

  const removeAttachment = () => {
    setForm((prev) => ({
      ...prev,
      attachment: null,
    }));
    setAttachmentError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    return () => {
      if (attachmentPreviewUrl) URL.revokeObjectURL(attachmentPreviewUrl);
    };
  }, [attachmentPreviewUrl]);

  const handleCaptchaChange = (e) => {
    setCaptcha((prev) => ({
      ...prev,
      answer: e.target.value,
    }));

    if (errors.captcha) {
      setErrors((prev) => {
        const nextErrors = { ...prev };
        delete nextErrors.captcha;
        return nextErrors;
      });
    }
  };

  const validateForm = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (form.name.trim().length < 2) nextErrors.name = "Enter your full name.";
    if (form.company.trim().length < 2) {
      nextErrors.company = "Enter your company.";
    }
    if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (form.message.trim().length < 20) {
      nextErrors.message = "Tell us a little more about your requirements.";
    }
    if (!captcha.token || !captcha.answer.trim()) {
      nextErrors.captcha = "Answer the verification question.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const resetForm = () => {
    setForm(createInitialForm());
    setAttachmentError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    loadCaptcha(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("sending");
    setErrors({});

    try {
      const payload = {
        identifier: "partner_with_us",
        name: form.name,
        company: form.company,
        email: form.email,
        message: form.message,
        website: form.website,
        startedAt: form.startedAt || Date.now(),
        captchaAnswer: captcha.answer,
        captchaToken: captcha.token,
      };

      if (form.attachment) {
        payload.attachmentName = form.attachment.name;
        payload.attachmentType = form.attachment.type;
        payload.attachmentBase64 = await toBase64(form.attachment);
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || { form: data.message || "Unable to send." });
        setStatus("idle");
        loadCaptcha();
        return;
      }

      setStatus("sent");
      resetForm();
    } catch {
      setErrors({
        form: "Unable to send your inquiry right now. Please try again.",
      });
      setStatus("idle");
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-stone-950 py-28 text-white"
    >
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/siteImages/factoryIMages/partner_us.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <span className="text-sm uppercase tracking-[0.25em] text-amber-500">
              Exports & Wholesale
            </span>

            <h2 className="mt-4 text-4xl font-bold text-amber-800 md:text-6xl">
              Partner With
              <span className="block text-amber-500 italic">FirmLeather</span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-400">
              Looking for a trusted leather manufacturing partner? We help
              brands, wholesalers, and retailers source premium leather goods
              with reliable production and worldwide delivery.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-8">
              {FEATURES.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
                      <Icon size={24} />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold">{item.title}</h3>

                      <p className="mt-2 text-stone-400">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact Info */}
            <div className="mt-12 border-t border-white/10 pt-8 space-y-4">
              <a
                href="mailto:info@firmleather.com"
                className="flex items-center gap-3 text-stone-300 transition hover:text-white"
              >
                <Mail className="h-5 w-5 text-amber-500" />
                info@firmleather.com
              </a>

              <a
                href="mailto:contact@firmleather.com"
                className="flex items-center gap-3 text-stone-300 transition hover:text-white"
              >
                <Mail className="h-5 w-5 text-amber-500" />
                contact@firmleather.com
              </a>

              <a
                href="tel:+923343000580"
                className="flex items-center gap-3 text-stone-300 transition hover:text-white"
              >
                <Phone className="h-5 w-5 text-amber-500" />
                +92 334 3000580
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-[2rem] border border-stone-800 bg-stone-900/70 p-8 backdrop-blur-sm md:p-10">
            <h3 className="text-3xl font-semibold text-amber-800">
              Send an Inquiry
            </h3>

            <p className="mt-2 text-stone-300">
              Tell us about your requirements and our team will respond within
              24 hours.
            </p>

            <form
              onSubmit={handleSubmit}
              onFocusCapture={() => loadCaptcha()}
              className="mt-8 space-y-5"
              noValidate
            >
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    aria-invalid={Boolean(errors.name)}
                    className="w-full rounded-2xl border text-stone-300 border-stone-700 bg-stone-950 px-5 py-4 outline-none transition focus:border-amber-500"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-300">{errors.name}</p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={form.company}
                    onChange={handleChange}
                    required
                    aria-invalid={Boolean(errors.company)}
                    className="w-full rounded-2xl text-stone-300 border border-stone-700 bg-stone-950 px-5 py-4 outline-none transition focus:border-amber-500"
                  />
                  {errors.company && (
                    <p className="mt-2 text-sm text-red-300">
                      {errors.company}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.email)}
                  className="w-full rounded-2xl border text-stone-300 border-stone-700 bg-stone-950 px-5 py-4 outline-none transition focus:border-amber-500"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-300">{errors.email}</p>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us about your project, order quantity, or product requirements..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.message)}
                  className="w-full resize-none text-stone-300 rounded-2xl border border-stone-700 bg-stone-950 px-5 py-4 outline-none transition focus:border-amber-500"
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-300">{errors.message}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-300">
                  Attachment (optional)
                </label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    ref={fileInputRef}
                    id="home-contact-attachment"
                    type="file"
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="home-contact-attachment"
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-stone-700 bg-stone-950 px-5 py-3 text-sm font-semibold text-stone-200 transition hover:border-amber-500 hover:text-white"
                  >
                    <Paperclip className="h-4 w-4 text-amber-500" />
                    Attach file
                  </label>
                  <span className="min-w-0 text-sm text-stone-400">
                    {form.attachment
                      ? form.attachment.name
                      : "No file selected"}
                  </span>
                </div>
                <p className="mt-2 text-xs text-stone-500">
                  Images, PDF, DOC, or DOCX up to 5MB.
                </p>
                {attachmentError && (
                  <p className="mt-2 text-sm text-red-300">{attachmentError}</p>
                )}

                {form.attachment && (
                  <div className="mt-3 flex items-center gap-3 rounded-2xl border border-stone-700 bg-stone-950 p-3 text-sm text-stone-300">
                    {attachmentPreviewUrl ? (
                      <img
                        src={attachmentPreviewUrl}
                        alt="Attachment preview"
                        className="h-12 w-12 rounded-xl object-cover"
                      />
                    ) : (
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-900 text-amber-500">
                        <FileText className="h-5 w-5" />
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-stone-200">
                        {form.attachment.name}
                      </p>
                      <p className="text-xs text-stone-500">
                        {(form.attachment.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeAttachment}
                      aria-label="Remove attachment"
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-stone-400 transition hover:bg-red-500/10 hover:text-red-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="home-contact-captcha"
                  className="mb-2 block text-sm font-semibold text-stone-300"
                >
                  Verification: {captcha.question || "Loading..."}
                </label>
                <input
                  id="home-contact-captcha"
                  type="text"
                  inputMode="numeric"
                  name="captchaAnswer"
                  placeholder="Type the answer"
                  value={captcha.answer}
                  onChange={handleCaptchaChange}
                  required
                  aria-invalid={Boolean(errors.captcha)}
                  className="w-full rounded-2xl text-stone-300 border border-stone-700 bg-stone-950 px-5 py-4 outline-none transition focus:border-amber-500"
                />
                {errors.captcha && (
                  <p className="mt-2 text-sm text-red-300">{errors.captcha}</p>
                )}
              </div>

              {errors.form && (
                <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {errors.form}
                </p>
              )}

              {status === "sent" && (
                <p className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                  Your inquiry has been sent. Our team will respond shortly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-2xl bg-amber-500 py-4 font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
              >
                {status === "sending" ? "Sending..." : "Submit Inquiry"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
