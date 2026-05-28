"use client";
import React, { useCallback, useState, use, useMemo, useRef } from "react";
import Image from "next/image";
import {
  Sparkles,
  AlertCircle,
  Paperclip,
  X,
  Image as ImageIcon,
} from "lucide-react";

// ── Constants ────────────────────────────────────────────────────────────────

const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024; // 5MB

const PRODUCT_TYPES = [
  "Wholesale / Retail",
  "Sample Request",
  "Corporate Gifting",
  "Custom Manufacturing",
  "White Label",
];

const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  company: "",
  productType: PRODUCT_TYPES[0],
  quantity: 10,
  details: "",
  startedAt: 0,
  attachment: null,
  attachmentError: "",
};

// ── Sub-components ───────────────────────────────────────────────────────────

const ErrorMessage = ({ message }) =>
  message ? (
    <p className="text-red-500 text-xs mt-1 flex items-center">
      <AlertCircle className="w-3 h-3 mr-1" aria-hidden="true" />
      {message}
    </p>
  ) : null;

const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
  ...props
}) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-sm font-medium text-stone-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === "textarea" ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={6}
        className={`w-full rounded-lg border px-4 py-2 outline-none transition ${
          error
            ? "border-red-400 focus:border-red-500"
            : "border-stone-300 focus:border-leather-500 focus:ring-2 focus:ring-leather-500"
        }`}
        {...props}
      />
    ) : type === "select" ? (
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-stone-300 px-4 py-2 outline-none transition focus:border-leather-500 focus:ring-2 focus:ring-leather-500"
        {...props}
      >
        {props.children}
      </select>
    ) : (
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-4 py-2 outline-none transition ${
          error
            ? "border-red-400 focus:border-red-500"
            : "border-stone-300 focus:border-leather-500 focus:ring-2 focus:ring-leather-500"
        }`}
        {...props}
      />
    )}
    {error && <ErrorMessage message={error} />}
  </div>
);

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const SuccessMessage = ({ onReset }) => (
  <div className="text-center py-12">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-green-100">
      <Sparkles className="w-8 h-8 text-green-600" aria-hidden="true" />
    </div>
    <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">
      Request Received
    </h3>
    <p className="text-stone-600 mb-6">
      Your quote request has been submitted. Our team will review it and contact
      you shortly.
    </p>
    <button
      onClick={onReset}
      className="inline-block rounded-lg bg-leather-600 px-6 py-2 font-semibold text-white hover:bg-leather-700"
    >
      Submit Another Request
    </button>
  </div>
);

// ── Main Component ───────────────────────────────────────────────────────────

const createInitialFormData = () => ({
  ...INITIAL_FORM_DATA,
  startedAt: Date.now(),
});

const RequestQuote = ({ params }) => {
  const { quotename } = use(params);
  const [formData, setFormData] = useState(createInitialFormData);
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [captcha, setCaptcha] = useState({
    answer: "",
    question: "",
    token: "",
  });
  const fileInputRef = useRef(null);

  const attachmentPreviewUrl = useMemo(() => {
    if (!formData.attachment?.type.startsWith("image/")) return null;
    return URL.createObjectURL(formData.attachment);
  }, [formData.attachment]);

  const loadCaptcha = useCallback(
    async (force = false) => {
      if (captcha.token && !force) return;

      try {
        const res = await fetch("/api/quote/captcha", { cache: "no-store" });
        const data = await res.json();
        setCaptcha({
          answer: "",
          question: data.question || "",
          token: data.token || "",
        });
      } catch {
        setErrors((prev) => ({
          ...prev,
          captcha: "Unable to load verification. Please try again.",
        }));
      }
    },
    [captcha.token],
  );

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    },
    [errors],
  );

  const handleCaptchaChange = useCallback(
    (e) => {
      setCaptcha((prev) => ({ ...prev, answer: e.target.value }));
      if (errors.captcha) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next.captcha;
          return next;
        });
      }
    },
    [errors],
  );

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_ATTACHMENT_SIZE) {
        setFormData((prev) => ({
          ...prev,
          attachmentError: `File is too large. Max size is 5MB.`,
        }));
        return;
      }
      setFormData((prev) => ({
        ...prev,
        attachment: file,
        attachmentError: "",
      }));
    }
  };

  const removeAttachment = () => {
    setFormData((prev) => ({
      ...prev,
      attachment: null,
      attachmentError: "",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = useCallback(() => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Full name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      nextErrors.email = "Valid email is required.";
    if (!formData.productType)
      nextErrors.productType = "Select a product type.";
    if (!formData.quantity || formData.quantity < 1)
      nextErrors.quantity = "Quantity must be at least 1.";
    if (!formData.details.trim() || formData.details.length < 10)
      nextErrors.details =
        "Please provide more details (at least 10 characters).";
    if (!captcha.answer.trim())
      nextErrors.captcha = "Answer the verification question.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [formData, captcha.answer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSending(true);
    setErrors({});

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        productType: formData.productType,
        quantity: formData.quantity,
        details: formData.details,
        productId: quotename,
        startedAt: formData.startedAt || Date.now(),
        captchaAnswer: captcha.answer,
        captchaToken: captcha.token,
      };

      if (formData.attachment) {
        payload.attachmentName = formData.attachment.name;
        payload.attachmentType = formData.attachment.type;
        payload.attachmentBase64 = await toBase64(formData.attachment);
      }

      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      setFormData(createInitialFormData());
    } catch {
      setErrors({
        form: "Network error. Please try again.",
      });
      setIsSending(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <SuccessMessage onReset={() => setSuccess(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-serif font-bold text-stone-900">
            Get a Quote
          </h1>
          <p className="text-lg text-stone-600">
            Interested in bulk orders or custom manufacturing? Request a quote
            from our team.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="bg-leather-600 px-6 py-4 sm:px-10">
            <h3 className="text-white font-semibold">Quote Request Form</h3>
          </div>
          <form
            onSubmit={handleSubmit}
            onFocusCapture={() => loadCaptcha()}
            className="space-y-6 p-6 sm:p-10"
            noValidate
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="John Doe"
                required
              />
              <FormField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="john@example.com"
                required
              />
            </div>

            <FormField
              label="Company Name"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your Company"
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="productType"
                  className="block text-sm font-medium text-stone-700"
                >
                  Product Requirement Type{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  id="productType"
                  name="productType"
                  value={formData.productType}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-stone-300 px-4 py-2 outline-none transition focus:border-leather-500 focus:ring-2 focus:ring-leather-500"
                >
                  {PRODUCT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.productType && (
                  <ErrorMessage message={errors.productType} />
                )}
              </div>

              <FormField
                label="Estimated Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                error={errors.quantity}
                min="1"
                required
              />
            </div>

            {quotename !== "general" && (
              <FormField
                label="Product ID"
                name="productId"
                value={quotename}
                disabled
                className="bg-stone-100"
              />
            )}

            <FormField
              label="Details"
              name="details"
              type="textarea"
              value={formData.details}
              onChange={handleChange}
              error={errors.details}
              placeholder="Tell us about your requirements..."
              required
            />

            <div className="space-y-2">
              <label
                htmlFor="attachment"
                className="block text-sm font-medium text-stone-700"
              >
                Attachment (Optional)
              </label>
              <div className="flex items-center gap-3">
                <input
                  ref={fileInputRef}
                  id="attachment"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-stone-50 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 transition"
                >
                  <Paperclip className="w-4 h-4" />
                  Choose File
                </button>
                {!formData.attachment && (
                  <span className="text-xs text-stone-500">Max 5MB</span>
                )}
              </div>
              {formData.attachmentError && (
                <ErrorMessage message={formData.attachmentError} />
              )}
              {formData.attachment && (
                <div className="mt-3 flex items-center gap-3 rounded-lg border border-stone-200 bg-stone-50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-stone-200">
                    {attachmentPreviewUrl ? (
                      <Image
                        src={attachmentPreviewUrl}
                        alt="Preview"
                        width={40}
                        height={40}
                        unoptimized
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="h-5 w-5 text-stone-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-900 truncate">
                      {formData.attachment.name}
                    </p>
                    <p className="text-xs text-stone-500">
                      {(formData.attachment.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removeAttachment}
                    className="rounded-full p-1 text-stone-400 hover:text-red-500 hover:bg-red-50 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="captcha"
                className="block text-sm font-medium text-stone-700"
              >
                Verification: {captcha.question || "Loading..."}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                id="captcha"
                type="text"
                inputMode="numeric"
                value={captcha.answer}
                onChange={handleCaptchaChange}
                placeholder="Your answer"
                className={`w-full rounded-lg border px-4 py-2 outline-none transition ${
                  errors.captcha
                    ? "border-red-400 focus:border-red-500"
                    : "border-stone-300 focus:border-leather-500 focus:ring-2 focus:ring-leather-500"
                }`}
              />
              {errors.captcha && <ErrorMessage message={errors.captcha} />}
            </div>

            {errors.form && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {errors.form}
              </div>
            )}

            <button
              type="submit"
              disabled={isSending}
              className="w-full rounded-lg bg-leather-600 px-6 py-3 font-semibold text-white transition hover:bg-leather-700 disabled:opacity-50"
            >
              {isSending ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestQuote;
