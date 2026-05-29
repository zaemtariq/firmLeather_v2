"use client";

import React, { useMemo } from "react";

/**
 * Hero section configuration
 * @type {Object}
 */
const HERO_CONFIG = {
  tag: "Inside the Workshop",
  mainTitle: "The Art of",
  italicText: "Endurance",
  videoSrc: "/siteVideo/factory_tour.mp4",
  videoType: "video/mp4",
};

/**
 * Social media links configuration
 * @type {Array<{label: string, href: string}>}
 */
const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/firmleather",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/firmleather",
  },
  {
    label: "Catalog",
    href: "/catalog",
  },
];

/**
 * Copyright and footer text configuration
 * @type {Object}
 */
const FOOTER_CONFIG = {
  tagline: "Crafted for the global elite",
  year: new Date().getFullYear(),
  company: "FirmLeather",
};

/**
 * Generates structured data (JSON-LD) for the Factory Tour page
 * @returns {Object} Schema.org VideoObject and BreadcrumbList schema
 */
const generateFactoryTourSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://firmleather.com/factory-tour#webpage",
      url: "https://firmleather.com/factory-tour",
      name: "Factory Tour - FirmLeather",
      description:
        "Experience the artistry and precision behind FirmLeather's premium leather manufacturing process.",
      isPartOf: {
        "@id": "https://firmleather.com/#website",
      },
      datePublished: "2023-01-01",
      dateModified: new Date().toISOString().split("T")[0],
    },
    {
      "@type": "VideoObject",
      name: "FirmLeather Factory Tour",
      description:
        "An immersive look into the craftsmanship and precision of FirmLeather's manufacturing process.",
      url: "https://firmleather.com/factory-tour",
      thumbnailUrl:
        "https://firmleather.com/siteImages/factoryIMages/leather_accessories.avif",
      uploadDate: "2023-01-01",
      contentUrl: "https://firmleather.com/siteVideo/factory_tour.mp4",
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
          name: "Factory Tour",
          item: "https://firmleather.com/factory-tour",
        },
      ],
    },
  ],
});

/**
 * Hero - Animated hero section with background video
 * @returns {React.ReactElement}
 */
const Hero = React.memo(() => (
  <header
    className="relative h-[90vh] flex items-end overflow-hidden"
    role="banner"
    aria-label="Factory tour introduction"
  >
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
      aria-hidden="true"
    >
      <source src={HERO_CONFIG.videoSrc} type={HERO_CONFIG.videoType} />
      Your browser does not support the video tag.
    </video>

    <div
      className="relative z-10 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000 p-4 sm:px-12"
      role="region"
      aria-label="Hero content"
    >
      <p className="text-amber-600 font-bold tracking-[0.4em] uppercase text-xs mb-4">
        {HERO_CONFIG.tag}
      </p>

      <h1 className="text-6xl md:text-8xl font-serif text-stone-100 mb-6 leading-tight">
        {HERO_CONFIG.mainTitle} <br />
        <span className="italic text-amber-500/80 underline decoration-1 underline-offset-8">
          {HERO_CONFIG.italicText}
        </span>
      </h1>
    </div>
  </header>
));

Hero.displayName = "Hero";

/**
 * SocialLinks - Footer social media links
 * @returns {React.ReactElement}
 */
const SocialLinks = React.memo(() => (
  <nav
    className="mb-8 flex justify-center gap-8 text-stone-600 text-xs uppercase tracking-[0.2em] font-bold"
    aria-label="Social media links"
  >
    {SOCIAL_LINKS.map((link) => (
      <a
        key={link.label}
        href={link.href}
        className="hover:text-amber-500 transition-colors"
        target={link.href.startsWith("/") ? undefined : "_blank"}
        rel={link.href.startsWith("/") ? undefined : "noopener noreferrer"}
        aria-label={`Visit our ${link.label}`}
      >
        {link.label}
      </a>
    ))}
  </nav>
));

SocialLinks.displayName = "SocialLinks";

/**
 * FooterContent - Copyright and company information
 * @returns {React.ReactElement}
 */
const FooterContent = React.memo(() => (
  <p className="text-[10px] uppercase tracking-[0.5em] text-stone-700">
    {FOOTER_CONFIG.tagline} &copy; {FOOTER_CONFIG.year} {FOOTER_CONFIG.company}
  </p>
));

FooterContent.displayName = "FooterContent";

/**
 * FactoryTour Page - Showcases the manufacturing process and workshop
 * Features immersive video background and brand messaging
 * @returns {React.ReactElement}
 */
const FactoryTour = () => {
  const schemaData = useMemo(() => generateFactoryTourSchema(), []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div
        className="min-h-screen bg-[#0C0B0A] text-stone-300 selection:bg-amber-900/30 font-sans"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        <Hero />

        {/* Footer */}
        <footer
          className="py-24 border-t border-stone-900 bg-[#080706] text-center"
          role="contentinfo"
          aria-label="Site footer"
        >
          <SocialLinks />
          <FooterContent />
        </footer>
      </div>
    </>
  );
};

FactoryTour.displayName = "FactoryTour";

export default FactoryTour;
