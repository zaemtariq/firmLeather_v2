"use client";
import React, { useState, useCallback, useMemo } from "react";
import { Plus, Minus } from "lucide-react";

// ============================================================================
// CONFIGURATION CONSTANTS
// ============================================================================
/**
 * FAQ items for the contact page
 * @type {Array}
 */
const FAQS = [
  {
    id: "faq-shipping",
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship our leather goods worldwide. Shipping costs and delivery times vary by location, but we generally use expedited couriers to ensure your items arrive safely.",
  },
  {
    id: "faq-warranty",
    question: "What is your warranty policy?",
    answer:
      "We stand behind the quality of our craftsmanship. All FirmLeather products come with a lifetime warranty against manufacturing defects. This covers hardware failure and stitching issues.",
  },
  {
    id: "faq-care",
    question: "How do I care for my leather product?",
    answer:
      "We recommend using a high-quality leather conditioner every 6 months. Avoid excessive water exposure and store in a cool, dry place when not in use. A dust bag is provided with every purchase.",
  },
  {
    id: "faq-custom",
    question: "Can I request a custom design?",
    answer:
      "Absolutely. We love working on bespoke projects. Please select 'Custom Order' in the contact form above and describe your vision. Our master craftsman will review your request.",
  },
];

/**
 * FAQ schema for SEO/structured data
 * Generates FAQPage schema with all FAQ items
 * @type {Function}
 */
const generateFaqSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

// ============================================================================
// SUB-COMPONENTS
// ============================================================================
/**
 * Individual FAQ item component
 * @component
 * @param {Object} props
 * @param {string} props.id - Unique identifier for the FAQ item
 * @param {string} props.question - Question text
 * @param {string} props.answer - Answer text
 * @param {boolean} props.isOpen - Whether the item is currently expanded
 * @param {Function} props.onToggle - Callback when toggling open/closed state
 * @returns {React.ReactElement}
 */
const FaqItem = React.memo(({ id, question, answer, isOpen, onToggle }) => (
  <article
    className="border border-leather-200 bg-transparent hover:bg-white transition-colors duration-200"
    itemScope
    itemType="https://schema.org/Question"
  >
    <button
      id={`faq-button-${id}`}
      aria-expanded={isOpen}
      aria-controls={`faq-content-${id}`}
      onClick={onToggle}
      className="w-full flex justify-between items-center p-4 focus:outline-none focus:ring-2 focus:ring-leather-900 focus:ring-offset-2 transition-all"
    >
      <span
        className="font-sans text-base md:text-lg font-semibold text-stone-950 text-left pr-4 flex-1"
        itemProp="name"
      >
        {question}
      </span>
      <div className="shrink-0 text-leather-500 flex items-center justify-center w-4 h-4">
        {isOpen ? (
          <Minus className="w-4 h-4" aria-hidden="true" />
        ) : (
          <Plus className="w-4 h-4" aria-hidden="true" />
        )}
      </div>
    </button>

    <div
      id={`faq-content-${id}`}
      role="region"
      aria-labelledby={`faq-button-${id}`}
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div
        className="p-4 pt-0 text-stone-700 text-base leading-relaxed max-w-2xl"
        itemProp="acceptedAnswer"
        itemScope
        itemType="https://schema.org/Answer"
      >
        <span itemProp="text">{answer}</span>
      </div>
    </div>
  </article>
));

FaqItem.displayName = "FaqItem";

/**
 * FAQ heading component
 * @component
 * @returns {React.ReactElement}
 */
const FaqHeading = React.memo(() => (
  <div className="mb-8">
    <h2 className="text-3xl font-serif font-bold text-stone-950">
      Frequently Asked Questions
    </h2>
    <p className="text-stone-600 text-base mt-2">
      Find answers to common questions about our leather goods, shipping,
      warranty, and custom services.
    </p>
  </div>
));

FaqHeading.displayName = "FaqHeading";

/**
 * FAQ items list container
 * @component
 */
const FaqItemsList = React.memo(({ items, openIndex, onToggle }) => (
  <div className="space-y-3">
    {items.map((faq, index) => (
      <FaqItem
        key={faq.id}
        {...faq}
        isOpen={openIndex === index}
        onToggle={() => onToggle(index)}
      />
    ))}
  </div>
));

FaqItemsList.displayName = "FaqItemsList";

// ============================================================================
// MAIN COMPONENT
// ============================================================================
/**
 * FAQ Section component for contact page
 * Displays frequently asked questions in an accordion format with schema markup
 *
 * @component
 * @returns {React.ReactElement} Rendered FAQ section
 * @example
 * // Basic usage
 * <FaqSection />
 */
export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  // Handle FAQ item toggle
  const handleToggle = useCallback((index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  // Memoized FAQ schema
  const faqSchema = useMemo(() => generateFaqSchema(), []);

  // Memoized FAQ items
  const faqItems = useMemo(() => FAQS, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section
        id="faqSection"
        className="py-12 border-t border-leather-200 mt-12"
        aria-labelledby="faq-heading"
      >
        <div id="faq-heading" className="sr-only">
          Frequently Asked Questions
        </div>
        <FaqHeading />
        <FaqItemsList
          items={faqItems}
          openIndex={openIndex}
          onToggle={handleToggle}
        />
      </section>
    </>
  );
};
