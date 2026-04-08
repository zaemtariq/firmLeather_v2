"use client";
import React, { useState, useRef, useCallback, useMemo } from "react";
import {
  Sparkles,
  Paperclip,
  X,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";
import { Button } from "./Button";

// ============================================================================
// CONFIGURATION CONSTANTS
// ============================================================================
/**
 * Inquiry type options for contact form
 * @type {Object}
 */
const INQUIRY_TYPES = {
  GENERAL: "General Inquiry",
  CUSTOM_ORDER: "Custom Order",
  SAMPLE_ORDER: "Sample Order",
  REPAIR_RESTORATION: "Repair & Restoration",
  WHOLESALE: "Wholesale",
  OTHER: "Other",
};

/**
 * Initial form data structure
 * @type {Object}
 */
const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  orderNumber: "",
  subject: "",
  message: "",
  attachment: null,
};

/**
 * Form field configuration
 * @type {Array}
 */
const FORM_FIELDS = [
  {
    name: "name",
    type: "text",
    label: "Full Name",
    placeholder: "John Doe",
    required: true,
    validation: (value) => !!value.trim(),
    errorMessage: "Name is required",
  },
  {
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "john@example.com",
    required: true,
    validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    errorMessage: "Please enter a valid email address",
  },
  {
    name: "subject",
    type: "text",
    label: "Subject",
    placeholder: "e.g. Custom briefcase commission",
    required: true,
    validation: (value) => !!value.trim(),
    errorMessage: "Subject is required",
  },
];

/**
 * Contact form schema for SEO/structured data
 * @type {Object}
 */
const CONTACT_FORM_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ContactPoint",
  name: "FirmLeather Contact Form",
  contactType: "Customer Service",
  availableLanguage: "en",
  description: "Submit inquiries for leather manufacturing and services",
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================
/**
 * Error message display component
 * @component
 */
const ErrorMessage = React.memo(({ message }) =>
  message ? (
    <p
      className="text-red-500 text-xs mt-1 flex items-center"
      role="alert"
      aria-live="polite"
    >
      <AlertCircle className="w-3 h-3 mr-1" aria-hidden="true" />
      {message}
    </p>
  ) : null,
);

ErrorMessage.displayName = "ErrorMessage";

/**
 * Form input field component
 * @component
 */
const FormInputField = React.memo(
  ({ label, id, name, value, onChange, error, placeholder, type = "text" }) => (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-xs font-bold uppercase tracking-wider text-black"
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
        className={`block w-full border-b py-2 px-0 text-black placeholder:text-gray-200 focus:outline-none transition-colors font-serif text-lg ${
          error
            ? "border-red-400 focus:border-red-500"
            : "border-leather-300 focus:border-leather-900"
        }`}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  ),
);

FormInputField.displayName = "FormInputField";

/**
 * Inquiry type button component
 * @component
 */
const InquiryTypeButton = React.memo(({ type, isSelected, onClick }) => (
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
));

InquiryTypeButton.displayName = "InquiryTypeButton";

/**
 * Attachment preview component
 * @component
 */
const AttachmentPreview = React.memo(({ attachment, onRemove }) => (
  <div className="mt-3 flex items-center p-3  border border-leather-200 rounded-md animate-fade-in">
    <div className="h-10 w-10  rounded flex items-center justify-center text-leather-600 mr-3 overflow-hidden shrink-0">
      {attachment.type.startsWith("image/") ? (
        <img
          src={URL.createObjectURL(attachment)}
          alt={`Preview of ${attachment.name}`}
          className="h-full w-full object-cover"
        />
      ) : (
        <ImageIcon className="w-5 h-5" aria-hidden="true" />
      )}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-leather-900 truncate">
        {attachment.name}
      </p>
      <p className="text-xs text-leather-500">
        {(attachment.size / 1024).toFixed(1)} KB
      </p>
    </div>
    <button
      type="button"
      onClick={onRemove}
      aria-label={`Remove attachment ${attachment.name}`}
      className="ml-4 p-1 rounded-full text-leather-400 hover:text-red-500 hover:bg-red-50 transition-colors"
    >
      <X className="w-4 h-4" aria-hidden="true" />
    </button>
  </div>
));

AttachmentPreview.displayName = "AttachmentPreview";

/**
 * Success message component
 * @component
 */
const SuccessMessage = React.memo(({ onSendAnother }) => (
  <div
    className="text-center py-12 animate-fade-in"
    role="status"
    aria-live="polite"
  >
    <div className="inline-flex items-center justify-center w-16 h-16  rounded-full mb-4">
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
));

SuccessMessage.displayName = "SuccessMessage";

/**
 * Form textarea component
 * @component
 */
const FormTextarea = React.memo(
  ({
    label,
    id,
    name,
    value,
    onChange,
    error,
    placeholder,
    fileInputRef,
    onAttachClick,
  }) => (
    <div className="space-y-2 relative">
      <div className="flex justify-between items-end mb-2">
        <label
          htmlFor={id}
          className="block text-xs font-bold uppercase tracking-wider text-leather-500"
        >
          {label}
        </label>
      </div>

      <div className="relative group">
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
          className={`block w-full border  p-4 pb-12 text-leather-900 placeholder:text-gray-200 focus:bg-white focus:outline-none transition-all resize-none font-serif text-lg leading-relaxed ${
            error
              ? "border-red-400 focus:border-red-500"
              : "border-leather-200 focus:border-leather-900"
          }`}
        />
        <div className="absolute bottom-3 right-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={onAttachClick}
            className="hidden"
            accept="image/*"
            aria-label="Attach reference image"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Attach reference image"
            className="cursor-pointer flex items-center space-x-2 bg-leather-100 text-leather-900 hover:text-leather-600 transition-colors p-2 rounded-full hover:bg-leather-100 focus:outline-none"
            title="Attach reference image"
          >
            <Paperclip className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      {error && <ErrorMessage message={error} />}
    </div>
  ),
);

FormTextarea.displayName = "FormTextarea";

// ============================================================================
// MAIN COMPONENT
// ============================================================================
/**
 * Contact form component for FirmLeather inquiries
 * Allows users to submit contact forms with optional file attachments
 *
 * @component
 * @returns {React.ReactElement} Rendered contact form
 */
export const ContactForm = () => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES.GENERAL);
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  // Memoized inquiry types list
  const inquiryTypesList = useMemo(() => Object.values(INQUIRY_TYPES), []);

  // Handle form field changes
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear error for this field when user starts typing
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors],
  );

  // Handle file selection
  const handleFileChange = useCallback((e) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, attachment: e.target.files[0] }));
    }
  }, []);

  // Remove attachment
  const removeAttachment = useCallback(() => {
    setFormData((prev) => ({ ...prev, attachment: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  // Validate form
  const validate = useCallback(() => {
    const newErrors = {};

    FORM_FIELDS.forEach((field) => {
      if (!field.validation(formData[field.name])) {
        newErrors[field.name] = field.errorMessage;
      }
    });

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Submit form
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validate()) return;

      setIsSending(true);

      try {
        console.group("📧 Sending Email");
        console.log("To: inquire@firmleather.com");
        console.log("Subject:", `[${inquiryType}] ${formData.subject}`);
        console.log("From:", `${formData.name} <${formData.email}>`);
        console.log("Message:", formData.message);
        if (formData.attachment) {
          console.log(
            "Attachment:",
            formData.attachment.name,
            `(${(formData.attachment.size / 1024).toFixed(2)} KB)`,
          );
        }
        console.groupEnd();

        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSending(false);
        setSuccess(true);
        setFormData(INITIAL_FORM_DATA);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setErrors({});
      } catch (error) {
        console.error("Failed to send email", error);
        setIsSending(false);
        setErrors({ submit: "Something went wrong. Please try again." });
      }
    },
    [formData, inquiryType, validate],
  );

  const schema = useMemo(() => CONTACT_FORM_SCHEMA, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="bg-white p-8 md:p-10 border border-leather-100 shadow-sm rounded-lg">
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-bold text-leather-900 mb-2">
            Compose Message
          </h2>
          <p className="text-leather-600 font-sans text-sm">
            Fill out the details below. We'll get back to you as soon as the
            leather dries.
          </p>
        </div>

        {success ? (
          <SuccessMessage onSendAnother={() => setSuccess(false)} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
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

            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-black">
                Inquiry Type
              </label>
              <div className="flex flex-wrap gap-3">
                {inquiryTypesList.map((type) => (
                  <InquiryTypeButton
                    key={type}
                    type={type}
                    isSelected={inquiryType === type}
                    onClick={setInquiryType}
                  />
                ))}
              </div>
            </div>

            <FormInputField
              id="subject"
              name="subject"
              label="Subject"
              value={formData.subject}
              onChange={handleChange}
              error={errors.subject}
              placeholder="e.g. Custom briefcase commission"
            />

            <FormTextarea
              id="message"
              name="message"
              label="Message"
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
              placeholder="Tell us about your project or question..."
              fileInputRef={fileInputRef}
              onAttachClick={handleFileChange}
            />

            {formData.attachment && (
              <AttachmentPreview
                attachment={formData.attachment}
                onRemove={removeAttachment}
              />
            )}

            {errors.submit && (
              <div
                className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100"
                role="alert"
              >
                {errors.submit}
              </div>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                isLoading={isSending}
                className="w-full cursor-pointer bg-primary hover:bg-primary-hover text-white md:w-auto text-base py-3 px-8"
              >
                Send Message
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};
