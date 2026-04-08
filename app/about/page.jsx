"use client";

import React, { useMemo } from "react";
import AboutIntro from "@/components/about/AboutIntro";
import Services from "@/components/about/Services";
import ManufacturingModels from "@/components/about/ManufacturingModels";
import GlobalReach from "@/components/about/GlobalReach";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import VisionMission from "@/components/about/VisionMission";

/**
 * Section configuration for the About page
 * @type {Array<{id: string, component: React.ComponentType, title: string}>}
 */
const ABOUT_SECTIONS = [
  {
    id: "vision",
    component: VisionMission,
    title: "Our Vision & Mission",
    padded: false,
  },
  {
    id: "about",
    component: AboutIntro,
    title: "About Firm Leather",
    padded: true,
  },
  {
    id: "services",
    component: Services,
    title: "Our Services",
    padded: true,
  },
  {
    id: "models",
    component: ManufacturingModels,
    title: "Manufacturing Models",
    padded: true,
  },
  {
    id: "global",
    component: GlobalReach,
    title: "Global Reach",
    padded: true,
  },
  {
    id: "why-us",
    component: WhyChooseUs,
    title: "Why Choose Us",
    padded: true,
  },
];

/**
 * Generates structured data (JSON-LD) for the About page
 * @returns {Object} Schema.org schema for the organization and page
 */
const generateAboutSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://firmleather.com/#organization",
      name: "Firm Leather",
      url: "https://firmleather.com",
      logo: "https://firmleather.com/site-logo/firm-leather-logo.svg",
      description:
        "Premium leather manufacturing and wholesale supplier specializing in high-quality leather products including jackets, belts, wallets, and accessories.",
      sameAs: [
        "https://www.facebook.com/firmleather",
        "https://www.instagram.com/firmleather",
      ],
      foundingDate: "2012",
      areaServed: "US",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        telephone: "+1-800-LEATHER",
        email: "info@firmleather.com",
        availableLanguage: ["en"],
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://firmleather.com/about#webpage",
      url: "https://firmleather.com/about",
      name: "About Firm Leather",
      description:
        "Learn about Firm Leather's mission, values, manufacturing process, and global reach in premium leather production.",
      isPartOf: {
        "@id": "https://firmleather.com/#website",
      },
      datePublished: "2023-01-01",
      dateModified: new Date().toISOString().split("T")[0],
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
          name: "About",
          item: "https://firmleather.com/about",
        },
      ],
    },
  ],
});

/**
 * SectionWrapper - Wraps individual section content with semantic HTML
 * @param {Object} props
 * @param {string} props.id - Section ID
 * @param {React.ComponentType} props.component - Section component
 * @param {string} props.title - Section title for accessibility
 * @param {boolean} props.padded - Whether to apply padding wrapper
 * @returns {React.ReactElement}
 */
const SectionWrapper = React.memo(
  ({ id, component: Component, title, padded }) => (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={padded ? "lg:p-15 md:p-15" : ""}
      itemScope
      itemType="https://schema.org/Thing"
    >
      <h2 id={`${id}-title`} className="sr-only">
        {title}
      </h2>
      <Component />
    </section>
  ),
);

SectionWrapper.displayName = "SectionWrapper";

/**
 * About Page - Main about/company information page
 * Displays company vision, mission, services, manufacturing process, and global reach
 * @returns {React.ReactElement}
 */
const About = () => {
  const schemaData = useMemo(() => generateAboutSchema(), []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <main
        className="grow"
        role="main"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        {ABOUT_SECTIONS.map((section) => (
          <SectionWrapper key={section.id} {...section} />
        ))}
      </main>
    </>
  );
};

About.displayName = "About";

export default About;
