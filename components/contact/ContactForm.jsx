"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Sparkles, AlertCircle } from "lucide-react";
import { Button } from "./Button";

// ── Constants ────────────────────────────────────────────────────────────────

const INQUIRY_TYPES = [
  "General Inquiry",
  "Custom Order",
  "Sample Order",
  "Repair & Restoration",
  "Wholesale",
  "Other",
];

const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024; // 5 MB

const INITIAL_FORM_DATA = {
  name: "",
  company: "",
  email: "",
  message: "",
  inquiryType: INQUIRY_TYPES[0],
  website: "",
  startedAt: 0,
  attachment: null,
};

const FORM_FIELDS = [
  {
    name: "name",
    type: "text",
    label: "Full Name",
    placeholder: "John Doe",
    validate: (v) => !!v.trim(),
    error: "Name is required",
  },
  {
    name: "company",
    type: "text",
    label: "Company",
    placeholder: "FirmLeather Co.",
    validate: (v) => v.trim().length >= 2,
    error: "Company is required",
  },
  {
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "john@example.com",
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    error: "Please enter a valid email address",
  },
];

// ── Sub-components ───────────────────────────────────────────────────────────

const ErrorMessage = ({ message }) =>
  message ? (
    <p
      className="text-red-500 text-xs mt-1 flex items-center"
      role="alert"
      aria-live="polite"
    >
      <AlertCircle className="w-3 h-3 mr-1" aria-hidden="true" />
      {message}
    </p>
  ) : null;

const FormInputField = ({
  label,
  id,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}) => (
  <div className="space-y-2">
    <label
      htmlFor={id}
      className="block text-[13px] font-bold uppercase tracking-wider text-stone-700"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`block w-full border-b py-2 px-0 text-stone-950 placeholder:text-stone-400 focus:outline-none transition-colors font-serif text-base md:text-lg ${
        error
          ? "border-red-400 focus:border-red-500"
          : "border-leather-300 focus:border-leather-900"
      }`}
    />
    {error && <ErrorMessage message={error} />}
  </div>
);

const InquiryTypeButton = ({ type, isSelected, onClick }) => (
  <button
    type="button"
    onClick={() => onClick(type)}
    aria-pressed={isSelected}
    className={`px-5 py-2 text-xs font-bold uppercase tracking-wide border transition-all duration-300 ${
      isSelected
        ? "bg-primary hover:bg-primary-hover text-white border-leather-900 shadow-md"
        : "bg-transparent text-leather-500 border-leather-200 hover:border-leather-400 hover:text-leather-800"
    }`}
  >
    {type}
  </button>
);

const SuccessMessage = ({ onSendAnother }) => (
  <div
    className="text-center py-12 animate-fade-in"
    role="status"
    aria-live="polite"
  >
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
      <Sparkles className="w-8 h-8 text-leather-600" aria-hidden="true" />
    </div>
    <h3 className="text-2xl font-serif text-leather-900 mb-2">Received</h3>
    <p className="text-leather-600 mb-6">
      Thank you for reaching out. Your inquiry has been sent.
    </p>
    <Button onClick={onSendAnother} variant="outline">
      Send Another
    </Button>
  </div>
);

const FormTextarea = ({
  label,
  id,
  name,
  value,
  onChange,
  error,
  placeholder,
}) => (
  <div className="space-y-2">
    <label
      htmlFor={id}
      className="block text-[13px] font-bold uppercase tracking-wider text-stone-700"
    >
      {label}
    </label>
    <textarea
      id={id}
      name={name}
      rows={6}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`block w-full border p-4 text-stone-950 placeholder:text-stone-400 focus:bg-white focus:outline-none transition-all resize-none font-serif text-base md:text-lg leading-relaxed ${
        error
          ? "border-red-400 focus:border-red-500"
          : "border-leather-200 focus:border-leather-900"
      }`}
    />
    {error && <ErrorMessage message={error} />}
  </div>
);

// ── Helpers ─────────────────────────────────────────────────────────────────

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

// ── Main Component ───────────────────────────────────────────────────────────

const createInitialFormData = () => ({
  ...INITIAL_FORM_DATA,
  startedAt: Date.now(),
});

export const ContactForm = () => {
  const [formData, setFormData] = useState(createInitialFormData);
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [captcha, setCaptcha] = useState({
    answer: "",
    question: "",
    token: "",
  });
  const [attachmentError, setAttachmentError] = useState("");
  const attachmentPreviewUrl = useMemo(() => {
    if (!formData.attachment?.type.startsWith("image/")) return null;
    return URL.createObjectURL(formData.attachment);
  }, [formData.attachment]);

  const loadCaptcha = useCallback(
    async (force = false) => {
      if (captcha.token && !force) return;

      try {
        const res = await fetch("/api/contact/captcha", { cache: "no-store" });
        const data = await res.json();
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

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_ATTACHMENT_SIZE) {
      setAttachmentError("Attachment must be 5MB or smaller.");
      return;
    }

    setAttachmentError("");
    setFormData((prev) => ({ ...prev, attachment: file }));
  }, []);

  const removeAttachment = useCallback(() => {
    setFormData((prev) => ({ ...prev, attachment: null }));
    setAttachmentError("");
  }, []);

  useEffect(() => {
    return () => {
      if (attachmentPreviewUrl) URL.revokeObjectURL(attachmentPreviewUrl);
    };
  }, [attachmentPreviewUrl]);

  const handleCaptchaChange = useCallback((e) => {
    setCaptcha((prev) => ({ ...prev, answer: e.target.value }));
    setErrors((prev) => {
      if (!prev.captcha) return prev;
      const next = { ...prev };
      delete next.captcha;
      return next;
    });
  }, []);

  const resetForm = useCallback(() => {
    setFormData(createInitialFormData());
    setErrors({});
    setIsSending(false);
    setCaptcha({ answer: "", question: "", token: "" });
  }, []);

  const validateForm = useCallback(() => {
    const nextErrors = {};

    FORM_FIELDS.forEach(({ name, validate, error }) => {
      if (!validate(formData[name])) nextErrors[name] = error;
    });

    if (!formData.message.trim()) nextErrors.message = "Message is required";
    if (!captcha.answer.trim())
      nextErrors.captcha = "Please answer the verification question";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [formData, captcha.answer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSending(true);
    setErrors({});

    const payload = {
      name: formData.name,
      company: formData.company,
      email: formData.email,
      message: formData.message,
      inquiryType: formData.inquiryType,
      website: formData.website,
      startedAt: formData.startedAt || Date.now(),
      captchaAnswer: captcha.answer,
      captchaToken: captcha.token,
    };

    if (formData.attachment) {
      payload.attachmentName = formData.attachment.name;
      payload.attachmentType = formData.attachment.type;
      payload.attachmentBase64 = await toBase64(formData.attachment);
    }

    try {
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
        setIsSending(false);
        loadCaptcha();
        return;
      }

      setSuccess(true);
      resetForm();
    } catch {
      setErrors({
        form: "Unable to send your inquiry right now. Please try again.",
      });
      setIsSending(false);
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPoint",
            name: "FirmLeather Contact Form",
            contactType: "Customer Service",
            availableLanguage: "en",
            description:
              "Submit inquiries for leather manufacturing and services",
          }),
        }}
      />

      <div className="bg-white p-8 md:p-10 border border-leather-100 shadow-sm rounded-lg">
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-stone-950 mb-2">
            Compose Message
          </h2>
          <p className="text-stone-600 font-sans text-base">
            Fill out the details below. We&apos;ll get back to you as soon as
            the leather dries.
          </p>
        </div>

        {success ? (
          <SuccessMessage onSendAnother={() => setSuccess(false)} />
        ) : (
          <form
            onSubmit={handleSubmit}
            onFocusCapture={() => loadCaptcha()}
            className="space-y-8"
            noValidate
          >
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {FORM_FIELDS.slice(0, 2).map((field) => (
                <FormInputField
                  key={field.name}
                  id={field.name}
                  {...field}
                  value={formData[field.name]}
                  onChange={handleChange}
                  error={errors[field.name]}
                />
              ))}
            </div>

            <FormInputField
              id="email"
              name="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="john@example.com"
              type="email"
            />

            <div className="space-y-3">
              <label className="block text-[13px] font-bold uppercase tracking-wider text-stone-700">
                Inquiry Type
              </label>
              <div className="flex flex-wrap gap-3">
                {INQUIRY_TYPES.map((type) => (
                  <InquiryTypeButton
                    key={type}
                    type={type}
                    isSelected={formData.inquiryType === type}
                    onClick={(value) =>
                      setFormData((prev) => ({ ...prev, inquiryType: value }))
                    }
                  />
                ))}
              </div>
            </div>

            <FormTextarea
              id="message"
              name="message"
              label="Message"
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
              placeholder="Tell us about your project or question..."
            />

            <div className="space-y-2">
              <label className="block text-[13px] font-bold uppercase tracking-wider text-stone-700">
                Attachment (optional)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="attachment-upload"
                />
                <label
                  htmlFor="attachment-upload"
                  className="inline-flex items-center justify-center rounded-full border border-leather-200 bg-leather-50 px-4 py-2 text-sm font-semibold text-leather-900 cursor-pointer hover:bg-leather-100"
                >
                  Attach file
                </label>
                <span className="text-sm text-stone-500">
                  {formData.attachment
                    ? formData.attachment.name
                    : "No file selected"}
                </span>
              </div>
              {attachmentError && (
                <p className="text-red-500 text-xs mt-1">{attachmentError}</p>
              )}

              {formData.attachment && (
                <div className="mt-3 flex items-center gap-3 rounded-lg border border-leather-200 bg-leather-50 p-3 text-sm text-stone-700">
                  {attachmentPreviewUrl ? (
                    <img
                      src={attachmentPreviewUrl}
                      alt="Attachment preview"
                      className="h-12 w-12 rounded object-cover"
                    />
                  ) : (
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded bg-white text-leather-600">
                      📎
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">
                      {formData.attachment.name}
                    </p>
                    <p className="text-xs text-stone-500">
                      {(formData.attachment.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removeAttachment}
                    className="rounded-full p-1 text-leather-500 hover:bg-red-50 hover:text-red-600"
                  >
                    Remove
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
                className={`w-full rounded-2xl border px-5 py-4 outline-none transition ${
                  errors.captcha
                    ? "border-red-500 focus:border-red-500"
                    : "border-stone-700 focus:border-amber-500"
                }`}
              />
              {errors.captcha && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" aria-hidden="true" />
                  {errors.captcha}
                </p>
              )}
            </div>

            {errors.form && (
              <div
                className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100"
                role="alert"
              >
                {errors.form}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSending}
                className="w-full rounded-2xl bg-amber-500 py-4 font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
              >
                {isSending ? "Sending..." : "Submit Inquiry"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};
