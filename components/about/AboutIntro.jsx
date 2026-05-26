"use client";
import React, { useMemo } from "react";

// Configuration constants
const ABOUT_CONFIG = {
  tagline: "Who We Are?",
  mainHeading: "A Trusted Global Partner in Leather Manufacturing",
  foundedYear: 2017,
  founder: "Tariq",
  coFounder: "Zaeem",
};

const COMPANY_DESCRIPTION = [
  {
    id: "mission",
    content:
      "Firm Leather is a premium leather manufacturer and exporter founded in 2017 with a mission to craft high-quality, timeless leather products that combine traditional craftsmanship with modern innovation. Specializing in genuine and full-grain leather goods, Firm Leather has grown into a trusted name among wholesale leather buyers and international leather importers.",
  },
  {
    id: "history",
    content:
      "The company began as a small leather workshop driven by a passionate artisan craftsman named Tariq, who had a deep appreciation for finely made leather goods and handcrafted leather accessories. From the outset, Firm Leather focused on meticulous attention to detail and superior leather workmanship, quickly earning a reputation for excellence in quality leather manufacturing among local sellers and leather retailers. As demand for premium leather products grew, Tariq's son Zaeem — equipped with a background in computer science and business insight — joined the venture. With his leadership, the company embraced modern leather production technology alongside age-old tanning and crafting techniques to streamline manufacturing and enhance quality control standards. Under his direction, Firm Leather expanded its reach beyond local markets to international leather trade clientele, showcasing its handcrafted leather products at global leather trade shows and exhibitions, and securing bulk leather export orders worldwide.",
  },
];

const CERTIFICATIONS = [
  {
    id: "iso",
    label: "ISO",
    description: "Certified",
  },
  {
    id: "reach",
    label: "REACH",
    description: "Compliant",
  },
];

// Organization Schema for SEO
const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://firmleather.com/#organization",
  name: "Firm Leather",
  url: "https://firmleather.com",
  logo: "https://firmleather.com/site-logo/favicon.svg",
  description: ABOUT_CONFIG.mainHeading,
  foundingDate: ABOUT_CONFIG.foundedYear.toString(),
  founders: [
    {
      "@type": "Person",
      name: ABOUT_CONFIG.founder,
    },
    {
      "@type": "Person",
      name: ABOUT_CONFIG.coFounder,
    },
  ],
  knowsAbout: [
    "Leather Manufacturing",
    "Genuine Leather Products",
    "Full-grain Leather",
    "Leather Craftsmanship",
    "Handcrafted Accessories",
    "Private Label Leather Manufacturing",
    "Finished Leather",
    "Sports Leather Gear",
  ],
  areaServed: "Worldwide",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "Sales",
      telephone: "+923343000580",
      email: "exports@firmleather.com",
      availableLanguage: ["en"],
    },
  ],
  sameAs: [],
};

// Section Tag Component
const SectionTag = React.memo(({ text }) => (
  <h2 className="text-leather-600 font-bold uppercase tracking-widest text-sm">
    {text}
  </h2>
));

SectionTag.displayName = "SectionTag";

// Main Heading Component
const MainHeading = React.memo(({ title }) => (
  <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight">
    {title}
  </h1>
));

MainHeading.displayName = "MainHeading";

// Description Paragraph Component
const DescriptionParagraph = React.memo(({ text, index }) => (
  <p
    className="text-stone-600 text-lg leading-relaxed text-justify"
    itemProp={index === 0 ? "description" : undefined}
  >
    {text}
  </p>
));

DescriptionParagraph.displayName = "DescriptionParagraph";

// Certification Badge Component
const CertificationBadge = React.memo(({ certification }) => (
  <div role="presentation">
    <span
      className="block text-3xl font-serif font-bold text-leather-700"
      aria-label={`${certification.label} - ${certification.description}`}
    >
      {certification.label}
    </span>
    <span className="text-sm text-stone-500 uppercase tracking-wide">
      {certification.description}
    </span>
  </div>
));

CertificationBadge.displayName = "CertificationBadge";

// Certifications Section Component
const CertificationsSection = React.memo(() => (
  <div
    className="pt-6 border-t border-stone-100 flex gap-8"
    role="group"
    aria-label="Company certifications and compliance"
  >
    {CERTIFICATIONS.map((cert) => (
      <CertificationBadge key={cert.id} certification={cert} />
    ))}
  </div>
));

CertificationsSection.displayName = "CertificationsSection";

// Content Section Component
const ContentSection = React.memo(() => (
  <article className="space-y-6">
    <SectionTag text={ABOUT_CONFIG.tagline} />
    <MainHeading title={ABOUT_CONFIG.mainHeading} />

    {COMPANY_DESCRIPTION.map((paragraph, index) => (
      <DescriptionParagraph
        key={paragraph.id}
        text={paragraph.content}
        index={index}
      />
    ))}

    <CertificationsSection />
  </article>
));

ContentSection.displayName = "ContentSection";

// Main AboutIntro Component
const AboutIntro = () => {
  const schema = useMemo(() => ORGANIZATION_SCHEMA, []);

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
        className="py-20 md:py-8 bg-white"
        aria-label="About FirmLeather - Company introduction and values"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-1 gap-12 items-center">
            <div className="order-1 md:order-2">
              <ContentSection />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutIntro;
