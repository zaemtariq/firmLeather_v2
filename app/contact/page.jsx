"use client";

import React, { useMemo } from "react";
import { InfoSection } from "@/components/contact/InfoSection";
import { FaqSection } from "@/components/contact/FaqSection";
import { ContactForm } from "@/components/contact/ContactForm";

/**
 * Hero section configuration for the Contact page
 */
const HERO_CONFIG = {
  established: "Est. 2017",
  location: "Sialkot, PK",
  headline: "Let's craft",
  tagline: "something lasting.",
  description: "Get in touch with Firm Leather for inquiries and orders",
};

/**
 * Page metadata and structure configuration
 */
const CONTACT_PAGE_CONFIG = {
  title: "Contact Us",
  description:
    "Contact Firm Leather for premium leather products and inquiries",
  url: "https://firmleather.com/contact",
};

/**
 * Generates comprehensive structured data (JSON-LD) for the Contact page
 * @returns {Object} Schema.org contact page and organization schema
 */
const generateContactSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://firmleather.com/contact#webpage",
      url: "https://firmleather.com/contact",
      name: "Contact Firm Leather",
      description:
        "Contact page for Firm Leather. Submit inquiries, get quotes, or reach out to our premium leather supply team.",
      isPartOf: {
        "@id": "https://firmleather.com/#website",
      },
      datePublished: "2023-01-01",
      dateModified: new Date().toISOString().split("T")[0],
    },
    {
      "@type": "Organization",
      "@id": "https://firmleather.com/#organization",
      name: "Firm Leather",
      url: "https://firmleather.com",
      logo: "https://firmleather.com/site-logo/firm-leather-logo.svg",
      description:
        "Premium leather manufacturing and wholesale supplier specializing in high-quality leather jackets, belts, wallets, and accessories.",
      foundingDate: "2012",
      areaServed: "US",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "Customer Service",
          telephone: "+1-800-LEATHER",
          email: "info@firmleather.com",
          availableLanguage: ["en"],
          url: "https://firmleather.com/contact",
        },
        {
          "@type": "ContactPoint",
          contactType: "Sales",
          email: "sales@firmleather.com",
          availableLanguage: ["en"],
        },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Factory Address",
        addressLocality: "Sialkot",
        addressRegion: "Punjab",
        postalCode: "51310",
        addressCountry: "PK",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://firmleather.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact",
          item: "https://firmleather.com/contact",
        },
      ],
    },
  ],
});

/**
 * HeroContent - Left column with branding and company information
 * @returns {React.ReactElement}
 */
const HeroContent = React.memo(() => (
  <div
    className="lg:sticky lg:top-32"
    role="region"
    aria-label="Company introduction and contact information"
  >
    <div
      className="block text-primary font-sans text-xs font-bold tracking-[0.2em] uppercase mb-6"
      aria-label={`Established ${HERO_CONFIG.established} in ${HERO_CONFIG.location}`}
    >
      {HERO_CONFIG.established} — {HERO_CONFIG.location}
    </div>

    <h1 className="text-5xl md:text-6xl font-serif font-bold text-leather-900 mb-8 leading-none">
      {HERO_CONFIG.headline} <br />
      <span className="italic text-primary">{HERO_CONFIG.tagline}</span>
    </h1>

    <InfoSection />
  </div>
));

HeroContent.displayName = "HeroContent";

/**
 * ContactContent - Right column with form and FAQ
 * @returns {React.ReactElement}
 */
const ContactContent = React.memo(() => (
  <div role="region" aria-label="Contact form and frequently asked questions">
    <ContactForm />
    <FaqSection />
  </div>
));

ContactContent.displayName = "ContactContent";

/**
 * Contact Page - Main contact information and form page
 * Displays company contact information, inquiry form, and FAQ
 * @returns {React.ReactElement}
 */
export default function Contact() {
  const schemaData = useMemo(() => generateContactSchema(), []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div
        className="min-h-screen text-leather-900 font-sans selection:bg-leather-200 selection:text-leather-900"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        <main role="main" className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
            <article
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24"
              role="article"
              aria-label="Contact page layout"
            >
              {/* Left Column: Brand & Info (Sticky) */}
              <aside className="lg:col-span-5" aria-label="Company information">
                <HeroContent />
              </aside>

              {/* Right Column: Interaction (Scrollable) */}
              <section className="lg:col-span-7" aria-label="Contact methods">
                <ContactContent />
              </section>
            </article>
          </div>
        </main>
      </div>
    </>
  );
}
