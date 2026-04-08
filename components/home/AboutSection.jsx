"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Constants
const CAROUSEL_CONFIG = {
  autoPlayInterval: 5000,
  miniCarouselInterval: 8000,
  transitionDuration: 0.6,
};

const SLIDES = [
  {
    id: "1",
    image: "/siteImages/factoryIMages/11.png",
    title: "Premium Leather Wallet",
    description: "A finely handcrafted leather wallet...",
  },
  {
    id: "2",
    image: "/siteImages/factoryIMages/12.png",
    title: "Classic Leather Belt",
    description: "A classic leather belt crafted with precision...",
  },
  {
    id: "3",
    image: "/siteImages/factoryIMages/13.png",
    title: "Professional Golf Gloves",
    description: "High-quality leather golf gloves...",
  },
  {
    id: "4",
    image: "/siteImages/factoryIMages/14.png",
    title: "Leather Travel Bag",
    description: "A spacious and stylish leather travel bag...",
  },
  {
    id: "5",
    image: "/siteImages/factoryIMages/15.png",
    title: "Genuine Leather Jacket",
    description: "A genuine leather jacket crafted for comfort...",
  },
];

const STATS = [
  {
    id: "global-reach",
    label: "Global\nReach",
    value: "30+",
    description: "Countries",
    borderRadius: "2rem_0rem_0rem_0rem",
  },
  {
    id: "units-produced",
    label: "Units\nProduced",
    value: "500K",
    description: "annual output",
    borderRadius: "0rem_2rem_0rem_0rem",
  },
  {
    id: "established",
    label: "Established",
    value: "2017",
    description: "founded in Sialkot",
    borderRadius: "0rem_0_0_2rem",
  },
];

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FirmLeather",
  description: "Premium leather goods manufacturer and exporter since 2017",
  url: "https://www.firmleather.com",
  foundingDate: "2017",
  foundingLocation: {
    "@type": "Place",
    name: "Sialkot, Pakistan",
  },
  areaServed: {
    "@type": "Country",
    name: ["Global"],
  },
  knowsAbout: [
    "Leather Goods Manufacturing",
    "Custom Leather Products",
    "Premium Leather Goods",
  ],
};

// StatCard Component
const StatCard = ({ stat, onClick = null, isClickable = false }) => (
  <div
    onClick={onClick}
    className={`bg-${isClickable ? "black" : "white"} group ${isClickable ? "cursor-pointer" : ""} rounded-2xl flex flex-col justify-center items-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]`}
    role={isClickable ? "button" : "complementary"}
    aria-label={
      isClickable
        ? "Navigate to factory tour"
        : `${stat.label.replace("\n", " ")}: ${stat.value}`
    }
    tabIndex={isClickable ? 0 : -1}
    onKeyDown={
      isClickable ? (e) => e.key === "Enter" && onClick?.() : undefined
    }
  >
    <span
      className={`text-sm uppercase font-mono tracking-[0.2em] font-bold ${isClickable ? "text-white" : "text-gray-800"} mb-6`}
    >
      {stat.label}
    </span>
    {isClickable ? (
      <div className="flex items-center text-2xl font-semibold text-amber-500/80 group">
        <span>Tour</span>
        <ArrowRight
          className="h-10 w-10 text-amber-500/80 transition-transform duration-300 group-hover:translate-x-5"
          aria-hidden="true"
        />
      </div>
    ) : (
      <h3 className="text-4xl font-bold tracking-tight text-sub-heading">
        {stat.value}
      </h3>
    )}
    <p
      className={`text-[11px] ${isClickable ? "text-gray-200" : "text-gray-600"} font-medium ${isClickable ? "mt-2" : "mt-1"}`}
    >
      {stat.description}
    </p>
  </div>
);

export default function AboutSection() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [miniIndex, setMiniIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef(null);

  // Memoize schema data
  const organizationSchema = useMemo(() => ORGANIZATION_SCHEMA, []);

  // Memoize navigation callback
  const handleFactoryTourClick = useCallback(() => {
    router.push("/factory-tour");
  }, [router]);

  // Memoize next slide handler
  const handleNext = useCallback(
    () => setCurrentIndex((prev) => (prev + 1) % SLIDES.length),
    [],
  );

  // Mini carousel auto-play effect
  useEffect(() => {
    const miniTimer = setInterval(() => {
      setMiniIndex((prev) => (prev + 1) % SLIDES.length);
    }, CAROUSEL_CONFIG.miniCarouselInterval);
    return () => clearInterval(miniTimer);
  }, []);

  // Main carousel auto-play effect
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setInterval(
        handleNext,
        CAROUSEL_CONFIG.autoPlayInterval,
      );
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlay, handleNext]);

  return (
    <>
      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <section
        className="max-w-7xl mx-auto px-6 py-6 font-sans text-gray-900"
        aria-label="About FirmLeather - Premium Leather Goods Manufacturer"
        role="region"
      >
        {/* Header Section */}
        <header className="grid md:grid-cols-4 md:flex-row justify-center items-center px-6 mb-5 gap-8">
          <h2 className="text-4xl col-span-2 md:text-5xl leading-tight text-dark">
            Timeless Craftsmanship,{" "}
            <span className="text-heading italic font-bold font-serif">
              Modern Precision.
            </span>
          </h2>
          <div className="max-w-xl mx-auto font-light col-span-2 leading-relaxed">
            <p className="text-justify">
              <strong className="font-semibold text-black">
                At FirmLeather
              </strong>
              , we bridge the gap between artisanal leather heritage and modern
              leather manufacturing demands. We don't just produce leather goods
              — we engineer premium tactile experiences for discerning global
              brands, wholesalers, and retailers. Since 2017, we have been
              crafting high-quality leather products, leather garments, and
              custom leather accessories with precision, care, and consistent
              excellence. Using only full-grain and genuine leather sourced
              responsibly,{" "}
              <span className="text-black font-medium">
                sustainability remains at our core
              </span>
              , prioritizing ethical leather production practices and
              responsible sourcing to minimize environmental impact across our
              entire supply chain.
            </p>
          </div>
        </header>

        {/* Main Grid Layout */}
        <div className="rounded-3xl p-4 grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Featured Image Carousel */}
          <div className="bg-grey-50 hidden sm:hidden md:block lg:block rounded-[2rem] md:col-span-8 lg:col-span-8">
            <div className="relative overflow-hidden rounded-[2rem]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={SLIDES[miniIndex].image}
                  src={SLIDES[miniIndex].image}
                  alt={`${SLIDES[miniIndex].title} - ${SLIDES[miniIndex].description}`}
                  className="rounded-3xl h-[500px] object-cover w-full"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: CAROUSEL_CONFIG.transitionDuration,
                    ease: "easeInOut",
                  }}
                  loading="lazy"
                />
              </AnimatePresence>

              {/* Soft Overlay */}
              <div
                className="absolute inset-0 bg-black/10"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="sm:col-span-12 md:col-span-4 lg:col-span-4 grid grid-cols-2 rounded-2xl gap-8">
            {STATS.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}

            {/* Factory Tour Card */}
            <StatCard
              stat={{
                id: "factory-tour",
                label: "Factory",
                value: "Tour",
                description: "Explore our facilities",
                borderRadius: "1rem_0_2rem_0rem",
              }}
              onClick={handleFactoryTourClick}
              isClickable={true}
            />
          </div>
        </div>
      </section>
    </>
  );
}
