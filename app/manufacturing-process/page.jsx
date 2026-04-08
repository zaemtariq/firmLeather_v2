"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { FACTORY_STATIONS } from "../../components/constants/constants";
import { Send, User, Award, ShieldCheck } from "lucide-react";

// ─── SEO CONSTANTS ────────────────────────────────────────────────────────────

const BASE_URL = "https://firmleather.com";
const PAGE_PATH = "/manufacturing-process";
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

const SEO = {
  title: "Leather Manufacturing Process | Firm Leather",
  description:
    "Discover Firm Leather's meticulous premium leather manufacturing process — where centuries-old artisanal techniques meet modern precision engineering to deliver superior leather goods for global brands.",
  keywords: [
    "leather manufacturing process",
    "premium leather production",
    "artisanal leather crafting",
    "leather factory stages",
    "leather goods manufacturing",
    "quality leather production",
    "leather tanning process",
    "Firm Leather",
  ],
  og: {
    type: "website",
    image: `${BASE_URL}/images/og-manufacturing-process.jpg`,
    imageAlt: "Firm Leather manufacturing process — premium craftsmanship",
    imageWidth: "1200",
    imageHeight: "630",
    siteName: "Firm Leather",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@firmleather",
    creator: "@firmleather",
    image: `${BASE_URL}/images/twitter-manufacturing-process.jpg`,
  },
  robots:
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  canonical: PAGE_URL,
};

// ─── HERO CONFIG ──────────────────────────────────────────────────────────────

const HERO_CONFIG = {
  title: "Leather Manufacturing Process",
  description:
    "Discover the meticulous stages of our signature premium leather manufacturing process — where centuries-old artisanal leather crafting techniques meet modern precision engineering to deliver consistently superior leather goods for global brands, wholesalers, and private label buyers.",
};

const PROCESS_CONFIG = {
  standardLabel: "Standard",
  precisionSpec: "Precision within 0.1mm",
};

// ─── SCHEMA GENERATION ────────────────────────────────────────────────────────

/**
 * Generates comprehensive structured data (JSON-LD) for the Manufacturing Process page.
 * Includes WebPage, HowTo, Organization, BreadcrumbList, and FAQPage schemas.
 */
const generateManufacturingSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    // ── WebPage ───────────────────────────────────────────────────────────────
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: SEO.title,
      description: SEO.description,
      inLanguage: "en-US",
      datePublished: "2024-01-01",
      dateModified: new Date().toISOString().split("T")[0],
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#organization` },
      breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
      potentialAction: {
        "@type": "ReadAction",
        target: [PAGE_URL],
      },
    },

    // ── Website ───────────────────────────────────────────────────────────────
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Firm Leather",
      description: "Premium leather manufacturing for global brands.",
      inLanguage: "en-US",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/?s={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },

    // ── HowTo (manufacturing steps) ───────────────────────────────────────────
    {
      "@type": "HowTo",
      "@id": `${PAGE_URL}#howto`,
      name: "How Premium Leather Is Manufactured",
      description:
        "A step-by-step guide to Firm Leather's premium leather manufacturing process, combining artisanal crafting with modern precision engineering.",
      image: {
        "@type": "ImageObject",
        url: SEO.og.image,
        width: SEO.og.imageWidth,
        height: SEO.og.imageHeight,
      },
      totalTime: "P30D",
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: "Contact for pricing",
      },
      supply: [
        { "@type": "HowToSupply", name: "Raw hides" },
        { "@type": "HowToSupply", name: "Tanning agents" },
        { "@type": "HowToSupply", name: "Finishing compounds" },
      ],
      tool: [
        { "@type": "HowToTool", name: "Splitting machine" },
        { "@type": "HowToTool", name: "Staking machine" },
        { "@type": "HowToTool", name: "Embossing press" },
      ],
      step: FACTORY_STATIONS.map((station, index) => ({
        "@type": "HowToStep",
        "@id": `${PAGE_URL}#step-${index + 1}`,
        position: index + 1,
        name: station.name,
        text: station.description,
        image: {
          "@type": "ImageObject",
          url: station.videoUrl,
          description: `${station.name} process at Firm Leather`,
        },
        url: `${PAGE_URL}#step-${index + 1}`,
      })),
    },

    // ── Organization ──────────────────────────────────────────────────────────
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Firm Leather",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        "@id": `${BASE_URL}/#logo`,
        url: `${BASE_URL}/images/logo.png`,
        contentUrl: `${BASE_URL}/images/logo.png`,
        caption: "Firm Leather logo",
      },
      image: { "@id": `${BASE_URL}/#logo` },
      description:
        "Premium leather manufacturer specialising in high-quality artisanal craftsmanship for global brands, wholesalers, and private label buyers.",
      knowsAbout: [
        "Leather Manufacturing",
        "Premium Craftsmanship",
        "Quality Control",
        "Leather Tanning",
        "Leather Finishing",
      ],
      sameAs: [
        "https://www.linkedin.com/company/firmleather",
        "https://www.instagram.com/firmleather",
      ],
    },

    // ── BreadcrumbList ────────────────────────────────────────────────────────
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: BASE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Manufacturing Process",
          item: PAGE_URL,
        },
      ],
    },

    // ── FAQPage (boosts rich snippets) ────────────────────────────────────────
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What leather manufacturing processes does Firm Leather use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: `Firm Leather uses a ${FACTORY_STATIONS.length}-stage manufacturing process combining traditional artisanal techniques with modern precision engineering, including ${FACTORY_STATIONS.slice(
              0,
              3,
            )
              .map((s) => s.name)
              .join(", ")}, and more.`,
          },
        },
        {
          "@type": "Question",
          name: "What quality standards does Firm Leather follow?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Firm Leather maintains precision within 0.1mm across all manufacturing stages, ensuring consistent, premium-grade leather output for global brands and private label buyers.",
          },
        },
        {
          "@type": "Question",
          name: "Does Firm Leather supply leather to international brands?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Firm Leather supplies premium leather goods to global brands, wholesalers, and private label buyers worldwide.",
          },
        },
      ],
    },
  ],
});

// ─── REUSABLE COMPONENTS ──────────────────────────────────────────────────────

const DetailItem = React.memo(({ detail, index }) => (
  <div className="flex items-start gap-3 group/item" key={index}>
    <Award className="w-4 h-4 text-amber-900 group-hover/item:text-amber-500 transition-colors mt-1 shrink-0" />
    <span className="text-sm text-black group-hover/item:text-black transition-colors">
      {detail}
    </span>
  </div>
));
DetailItem.displayName = "DetailItem";

const FloatingSpec = React.memo(({ isEven }) => (
  <div
    className={`absolute bottom-6 ${
      isEven ? "-right-6" : "-left-6"
    } hidden md:block bg-[#1A1816] p-6 border border-stone-800 shadow-2xl`}
  >
    <p className="text-amber-600 text-[10px] font-bold uppercase tracking-widest mb-1">
      {PROCESS_CONFIG.standardLabel}
    </p>
    <p className="text-white text-sm italic font-serif">
      "{PROCESS_CONFIG.precisionSpec}"
    </p>
  </div>
));
FloatingSpec.displayName = "FloatingSpec";

const ProcessContent = React.memo(({ process, index }) => (
  <div className="w-full lg:w-2/5 space-y-8">
    <div>
      <span className="inline-block text-amber-500 font-serif text-5xl mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
        {(index + 1).toString().padStart(2, "0")}
      </span>
      <h2 className="text-4xl font-serif text-black group-hover:text-amber-500 transition-colors">
        {process.name}
      </h2>
    </div>

    <p className="text-black text-lg leading-relaxed font-light">
      {process.description}
    </p>

    <div className="grid grid-cols-1 gap-4 pt-4 border-t border-stone-800/50">
      {process.details.map((detail, i) => (
        <DetailItem key={i} detail={detail} index={i} />
      ))}
    </div>
  </div>
));
ProcessContent.displayName = "ProcessContent";

const ProcessVideo = React.memo(({ process, isEven }) => (
  <div className="w-full lg:w-3/5 relative">
    <div className="absolute -inset-4 border border-stone-800/50 -z-10 group-hover:scale-[1.02] transition-transform duration-700"></div>
    <div className="overflow-hidden bg-stone-900 aspect-[16/10]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        aria-label={`${process.name} leather manufacturing process video`}
        title={`${process.name} — Firm Leather Manufacturing`}
      >
        <source src={process.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <FloatingSpec isEven={isEven} />
  </div>
));
ProcessVideo.displayName = "ProcessVideo";

const ProcessCard = React.memo(({ process, index }) => {
  const isEven = index % 2 === 0;

  return (
    <article
      id={`step-${index + 1}`}
      className="group relative"
      itemScope
      itemType="https://schema.org/HowToStep"
    >
      <meta itemProp="position" content={index + 1} />
      <meta itemProp="name" content={process.name} />
      <meta itemProp="text" content={process.description} />
      <link itemProp="url" href={`${PAGE_URL}#step-${index + 1}`} />

      <div
        className={`flex flex-col ${
          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        } gap-16 items-center`}
      >
        <ProcessVideo process={process} isEven={isEven} />
        <ProcessContent process={process} index={index} />
      </div>
    </article>
  );
});
ProcessCard.displayName = "ProcessCard";

const HeroSection = React.memo(() => (
  <header className="relative z-10 max-w-5xl mx-auto text-center" role="banner">
    <h1 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-6 pt-2">
      <span className="text-amber-500">{HERO_CONFIG.title}</span>
    </h1>
    <p className="text-black max-w-2xl mx-auto leading-relaxed">
      {HERO_CONFIG.description}
    </p>
  </header>
));
HeroSection.displayName = "HeroSection";

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────

/**
 * ManufacturingProcess Page
 * Full SEO: JSON-LD (WebPage, HowTo, Organization, BreadcrumbList, FAQPage),
 * Open Graph, Twitter Card, canonical, robots, keywords all handled via
 * the companion metadata.js export (App Router) or next/head (Pages Router).
 */
const ManufacturingProcess = () => {
  const schemaData = useMemo(() => generateManufacturingSchema(), []);

  return (
    <>
      {/* ── Structured Data (JSON-LD) ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div
        className="min-h-screen bg-[#ffffff] text-black selection:bg-amber-900/30"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        <HeroSection />

        <main
          id="process"
          className="py-12"
          role="main"
          aria-label="Leather manufacturing process steps"
          itemScope
          itemType="https://schema.org/HowTo"
        >
          {/* HowTo microdata attributes on the main element */}
          <meta itemProp="name" content="How Premium Leather Is Manufactured" />
          <meta itemProp="description" content={SEO.description} />

          <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-15">
            {FACTORY_STATIONS.map((process, index) => (
              <ProcessCard key={process.id} process={process} index={index} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

ManufacturingProcess.displayName = "ManufacturingProcess";

export default ManufacturingProcess;
