"use client";
import React, { useCallback, useMemo } from "react";

// Constants for hero section configuration
const HERO_CONFIG = {
  video: {
    src: "./siteVideo/hero_factory_video.mp4",
    type: "video/mp4",
    poster: "/siteImages/factoryIMages/hero-image.jpg",
    posterAlt: "FirmLeather factory manufacturing premium leather goods",
  },
  heading: {
    primary: "From Raw Hides",
    secondary: "To Refined Leather Goods",
    ariaLabel: "FirmLeather - From Raw Hides To Refined Leather Goods",
  },
  description:
    "A trusted Leather Goods Manufacturer & Exporter for brands, retailers, and global partners.",
  scrollTarget: "product-Line",
};

// Schema markup for hero section
const HERO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Premium Leather Goods",
  description: HERO_CONFIG.description,
  brand: {
    "@type": "Brand",
    name: "FirmLeather",
  },
  manufacturer: {
    "@type": "Organization",
    name: "FirmLeather",
    url: "https://www.firmleather.com",
  },
};

export default function Hero() {
  // Memoize schema to prevent unnecessary re-renders
  const heroSchema = useMemo(() => HERO_SCHEMA, []);

  // Optimized scroll handler with useCallback
  const handleViewCollections = useCallback(() => {
    const productSection = document.getElementById(HERO_CONFIG.scrollTarget);
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(heroSchema),
        }}
      />

      {/* Hero Section */}
      <section
        className="relative h-screen flex items-end justify-start overflow-hidden"
        aria-label={HERO_CONFIG.heading.ariaLabel}
        role="region"
      >
        {/* Background Video Layer */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="relative w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={HERO_CONFIG.video.poster}
              className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
              aria-label="Background video of FirmLeather factory operations"
            >
              <source
                src={HERO_CONFIG.video.src}
                type={HERO_CONFIG.video.type}
              />
              <p>
                Your browser does not support HTML5 video. Please update your
                browser to view the video.
              </p>
            </video>
          </div>

          {/* Overlay Gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black"
            aria-hidden="true"
          />
        </div>

        {/* Hero Content */}
        <div className="p-10 relative max-w-4xl">
          <header>
            <h1
              className="text-4xl md:text-6xl text-stone-100 mb-6 leading-tight"
              itemProp="headline"
            >
              {HERO_CONFIG.heading.primary} <br />
              <span className="text-amber-500/80 italic font-bold font-serif">
                {HERO_CONFIG.heading.secondary}
              </span>
            </h1>

            <p
              className="font-body text-gray-300 text-justify uppercase"
              itemProp="description"
            >
              {HERO_CONFIG.description}
            </p>
          </header>
        </div>
      </section>
    </>
  );
}
