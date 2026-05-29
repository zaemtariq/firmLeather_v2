"use client";

import React, { useMemo } from "react";
import { InfoSection } from "@/components/contact/InfoSection";
import { FaqSection } from "@/components/contact/FaqSection";
import { ContactForm } from "@/components/contact/ContactForm";

const HERO_CONFIG = {
  established: "Est. 2017",
  location: "Sialkot, PK",
  headline: "Let's craft",
  tagline: "something lasting.",
  description: "Get in touch with FirmLeather for inquiries and orders",
};

const SITE_URL = "https://firmleather.com";
const CONTACT_URL = `${SITE_URL}/contact`;

const generateContactSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${CONTACT_URL}#webpage`,
      url: CONTACT_URL,
      name: "Contact FirmLeather",
      description:
        "Contact FirmLeather for wholesale leather products, private label manufacturing, samples, and export inquiries.",
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "FirmLeather",
      url: SITE_URL,
      logo: `${SITE_URL}/site-logo/favicon.svg`,
      description:
        "Premium leather manufacturer and exporter specializing in finished leather, leather apparel, accessories, sports leather gear, and private label production.",
      foundingDate: "2017",
      areaServed: "Worldwide",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "Sales",
          telephone: "+923343000580",
          email: "exports@firmleather.com",
          availableLanguage: ["en"],
          url: CONTACT_URL,
        },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sialkot",
        addressLocality: "Sialkot",
        addressRegion: "Punjab",
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
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact",
          item: CONTACT_URL,
        },
      ],
    },
  ],
});

const HeroContent = React.memo(() => (
  <div
    className="lg:sticky lg:top-32"
    role="region"
    aria-label="Company introduction and contact information"
  >
    <div
      className="block text-sub-heading font-sans text-sm font-bold tracking-[0.22em] uppercase mb-6"
      aria-label={`Established ${HERO_CONFIG.established} in ${HERO_CONFIG.location}`}
    >
      {HERO_CONFIG.established} — {HERO_CONFIG.location}
    </div>

    <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-950 mb-8 leading-none">
      {HERO_CONFIG.headline} <br />
      <span className="italic text-sub-heading">{HERO_CONFIG.tagline}</span>
    </h1>

    <InfoSection />
  </div>
));

HeroContent.displayName = "HeroContent";

const ContactContent = React.memo(() => (
  <div role="region" aria-label="Contact form and frequently asked questions">
    <ContactForm />
    <FaqSection />
  </div>
));

ContactContent.displayName = "ContactContent";

export default function Contact() {
  const schemaData = useMemo(() => generateContactSchema(), []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div
        className="min-h-screen bg-stone-50 text-stone-950 font-sans selection:bg-leather-200 selection:text-leather-900"
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
