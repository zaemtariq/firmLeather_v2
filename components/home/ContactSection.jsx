"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Container, Send, Mail, Phone } from "lucide-react";

// Configuration constants for maintainability
const FORM_CONFIG = {
  fields: [
    {
      id: "name",
      type: "text",
      label: "Full Name",
      placeholder: "John Doe",
      required: true,
      validation: (value) => value.trim().length >= 2,
      errorMessage: "Please enter your full name",
    },
    {
      id: "company",
      type: "text",
      label: "Company",
      placeholder: "Company Ltd",
      required: true,
      validation: (value) => value.trim().length >= 2,
      errorMessage: "Please enter your company name",
    },
    {
      id: "email",
      type: "email",
      label: "Email Address",
      placeholder: "john@company.com",
      required: true,
      validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      errorMessage: "Please enter a valid email address",
    },
    {
      id: "message",
      type: "textarea",
      label: "Message",
      placeholder:
        "Tell us about your inquiry, product requirements, or bulk order details...",
      required: true,
      rows: 4,
      validation: (value) => value.trim().length >= 10,
      errorMessage: "Please enter a message of at least 10 characters",
    },
  ],
};

const INFO_ITEMS = [
  {
    id: "manufacturing",
    icon: Container,
    title: "Custom Manufacturing",
    description:
      "We produce bespoke leather collections tailored to your brand specifications, including custom designs, finishes, colors, and branding solutions for wholesale partners.",
  },
  {
    id: "shipping",
    icon: Send,
    title: "Global Shipping",
    description:
      "Reliable logistics partnerships ensuring timely, secure delivery of your leather orders to 25+ countries worldwide with competitive rates.",
  },
];

// JSON-LD Schema for SEO
const CONTACT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "FirmLeather - Partnership & Wholesale Inquiry",
  description:
    "Contact FirmLeather for wholesale leather goods, custom manufacturing, bulk orders, and B2B partnerships. Competitive pricing and global shipping available.",
  url: "https://www.firmleather.com/contact",
  mainEntity: {
    "@type": "Organization",
    name: "FirmLeather",
    url: "https://www.firmleather.com",
    logo: "https://www.firmleather.com/logo.png",
    sameAs: [
      "https://www.facebook.com/firmleather",
      "https://www.instagram.com/firm.leather",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Business Development",
      telephone: "+92-334-3000580",
      email: "exports@firmleather.com",
      areaServed: "Global",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shah Faisal Plaza, Block B North Nazimabad Town",
      addressLocality: "Karachi",
      postalCode: "74600",
      addressCountry: "PK",
    },
  },
};

// Reusable FormInput Component
const FormInput = React.memo(({ field, value, onChange, error }) => {
  const isTextarea = field.type === "textarea";
  const TagName = isTextarea ? "textarea" : "input";

  return (
    <div className={isTextarea ? "md:col-span-2" : "md:col-span-1"}>
      <label
        htmlFor={field.id}
        className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
      >
        {field.label}
        {field.required && (
          <span
            className="text-red-500 ml-1"
            aria-label="required"
            title="This field is required"
          >
            *
          </span>
        )}
      </label>
      <TagName
        id={field.id}
        type={!isTextarea ? field.type : undefined}
        rows={isTextarea ? field.rows : undefined}
        value={value}
        onChange={(e) => onChange(field.id, e.target.value)}
        placeholder={field.placeholder}
        required={field.required}
        aria-required={field.required}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${field.id}-error` : undefined}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-leather-500 focus:border-transparent outline-none transition-all resize-none hover:border-gray-300"
      />
      {error && (
        <p
          id={`${field.id}-error`}
          className="mt-1 text-sm text-red-500 flex items-center"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});

FormInput.displayName = "FormInput";

// Reusable InfoCard Component
const InfoCard = React.memo(({ icon: IconComponent, title, description }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-heading text-white">
        <IconComponent className="h-6 w-6" aria-hidden="true" />
      </div>
    </div>
    <div className="flex-1">
      <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
));

InfoCard.displayName = "InfoCard";

export default function ContactSection() {
  const [formData, setFormData] = useState(
    FORM_CONFIG.fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.id]: "",
      }),
      {},
    ),
  );

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Memoized schema
  const schema = useMemo(() => CONTACT_SCHEMA, []);
  const formFields = useMemo(() => FORM_CONFIG.fields, []);
  const infoItems = useMemo(() => INFO_ITEMS, []);

  // Handle form field changes
  const handleFieldChange = useCallback(
    (fieldId, value) => {
      setFormData((prev) => ({
        ...prev,
        [fieldId]: value,
      }));
      // Clear error when user starts typing
      if (errors[fieldId]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[fieldId];
          return newErrors;
        });
      }
    },
    [errors],
  );

  // Validate form
  const validateForm = useCallback(() => {
    const newErrors = {};
    formFields.forEach((field) => {
      if (field.required && !field.validation(formData[field.id])) {
        newErrors[field.id] = field.errorMessage;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, formFields]);

  // Handle form submission
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (validateForm()) {
        console.log("Form submitted:", formData);
        setSubmitted(true);
        // Reset form after 2 seconds
        setTimeout(() => {
          setFormData(
            formFields.reduce(
              (acc, field) => ({
                ...acc,
                [field.id]: "",
              }),
              {},
            ),
          );
          setSubmitted(false);
        }, 2000);
      }
    },
    [formData, formFields, validateForm],
  );

  const isFormValid = useMemo(
    () =>
      formFields.every(
        (field) => !field.required || field.validation(formData[field.id]),
      ),
    [formData, formFields],
  );

  return (
    <>
      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <section
        id="contact"
        className="py-24 bg-leather-800 relative overflow-hidden"
        aria-label="Contact FirmLeather for wholesale and partnership inquiries"
        role="region"
      >
        {/* Background Decoration */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          aria-hidden="true"
        >
          <img
            src="/siteImages/factoryIMages/partner_us.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Information Section */}
            <section
              className="text-white"
              aria-labelledby="partnership-heading"
            >
              <div className="inline-block">
                <span className="text-sub-heading font-bold tracking-widest uppercase text-sm mb-4 block">
                  Exports & Wholesale
                </span>
              </div>
              <h2
                id="partnership-heading"
                className="text-4xl md:text-5xl font-serif font-bold mb-6"
              >
                Partner With Us
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Looking to stock premium FirmLeather products in your region? We
                offer competitive wholesale pricing for bulk orders and
                specialize in seamless international logistics to 25+ countries
                worldwide.
              </p>

              {/* Benefits Grid */}
              <div className="space-y-6 mb-12">
                {infoItems.map((item) => (
                  <InfoCard
                    key={item.id}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </div>

              {/* Quick Contact Links */}
              <div
                className="border-t border-white/20 pt-6 space-y-3"
                role="list"
              >
                <div className="flex items-center gap-3" role="listitem">
                  <Mail
                    className="w-5 h-5 text-amber-500 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <a
                    href="mailto:exports@firmleather.com"
                    className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:underline"
                  >
                    exports@firmleather.com
                  </a>
                </div>
                <div className="flex items-center gap-3" role="listitem">
                  <Phone
                    className="w-5 h-5 text-amber-500 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <a
                    href="tel:+92-334-3000580"
                    className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:underline"
                  >
                    +92 334 3000580
                  </a>
                </div>
              </div>
            </section>

            {/* Contact Form Section */}
            <section
              className="bg-white p-8 md:p-10 rounded-xl shadow-2xl"
              aria-labelledby="form-heading"
            >
              <h3
                id="form-heading"
                className="text-2xl font-serif font-bold text-leather-900 mb-2"
              >
                Send an Inquiry
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Fill out the form below and our business development team will
                respond within 24 hours.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Form Fields */}
                <div>
                  {/* Row for name and company */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {formFields
                      .filter((field) => field.type !== "textarea")
                      .map((field) => (
                        <FormInput
                          key={field.id}
                          field={field}
                          value={formData[field.id]}
                          onChange={handleFieldChange}
                          error={errors[field.id]}
                        />
                      ))}
                  </div>

                  {/* Message textarea */}
                  {formFields
                    .filter((field) => field.type === "textarea")
                    .map((field) => (
                      <FormInput
                        key={field.id}
                        field={field}
                        value={formData[field.id]}
                        onChange={handleFieldChange}
                        error={errors[field.id]}
                      />
                    ))}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormValid || submitted}
                  className="w-full py-4 bg-primary text-white font-bold uppercase tracking-widest hover:bg-primary-hover disabled:opacity-60 disabled:cursor-not-allowed transition-colors rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  aria-label="Submit your inquiry to FirmLeather"
                >
                  {submitted ? "Message Sent!" : "Submit Inquiry"}
                </button>

                {/* Required fields note */}
                <p className="text-xs text-gray-600 text-center">
                  <span className="text-red-500 font-bold">*</span> Indicates
                  required field
                </p>
              </form>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
