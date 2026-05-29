"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PRODUCT_LINE } from "@/components/constants/constants";
import { useCategoryStore } from "../store/useStore";

// Configuration constants
const INTERSECTION_OPTIONS = {
  threshold: 0.2,
};

// SEO Schema markup
const PRODUCT_LINE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "FirmLeather Product Line",
  description:
    "Complete leather product line, merging heritage craftsmanship with modern innovation for versatile applications",
  keywords: [
    "finished leather",
    "leather jackets",
    "cowboy chaps",
    "leather belts",
    "leather wallets",
    "RFID-blocking wallets",
    "golf gloves",
    "baseball batting gloves",
  ],
  itemListElement: (PRODUCT_LINE || []).map((item, index) => ({
    "@type": "Product",
    position: index + 1,
    name: item.title,
    description: item.description,
    image: item.imageUrl,
    category: item.Url,
  })),
};

// ProductImage Component
const ProductImage = React.memo(({ item, index, onClick }) => {
  const number = (index + 1).toString().padStart(2, "0");

  return (
    <div
      className="relative z-20 flex justify-center"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onClick();
      }}
      aria-label={`View ${item.title}`}
    >
      <div className="group relative">
        {/* Main Image Circle */}
        <div className="relative h-56 w-56 cursor-pointer overflow-hidden rounded-full border-8 border-white bg-white shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 md:h-64 md:w-64">
          <Image
            src={item.imageUrl}
            alt={`${item.title} - Premium leather product from FirmLeather`}
            fill
            sizes="(min-width: 768px) 256px, 224px"
            className="rounded-full object-cover grayscale-[20%] transition-all duration-500 group-hover:grayscale-0"
          />
          <div
            className="absolute inset-0 bg-[#4A3728]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
            aria-hidden="true"
          />
        </div>
        <div
          className="absolute -left-3 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-sub-heading font-serif text-sm font-bold text-white shadow-lg md:-left-5 md:h-14 md:w-14 md:text-base"
          aria-hidden="true"
        >
          {number}
        </div>

        {/* Animated Dashed Ring */}
        <div
          className="absolute inset-[-12px] rounded-full border border-dashed border-[#6B8E23]/30 animate-[spin_20s_linear_infinite] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
        />
      </div>
    </div>
  );
});

ProductImage.displayName = "ProductImage";

// ProductItem Component - Main reusable component
const ProductItem = React.memo(({ item, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);
  const { setActiveCategory } = useCategoryStore();
  const router = useRouter();

  // Memoize navigation handler
  const handleProductClick = useCallback(() => {
    const slug = item.path || item.Url?.toLowerCase().replace(/\s+/g, "-");
    setActiveCategory(item.Url);
    router.push(slug);
  }, [item, setActiveCategory, router]);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsVisible(entry.isIntersecting);
      });
    }, INTERSECTION_OPTIONS);

    const current = domRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <article
      ref={domRef}
      className={`relative grid items-center gap-8 transition-all duration-1000 transform
  md:grid-cols-[minmax(0,1fr)_18rem_minmax(0,1fr)] md:gap-10 ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
  }`}
      role="listitem"
    >
      {/* Content Section */}
      <section
        className={`flex flex-col justify-center md:min-h-64 ${
          item.side === "right"
            ? "md:col-start-3 md:items-start md:text-left"
            : "md:col-start-1 md:items-end md:text-right"
        }`}
      >
        <span className="mb-3 h-px w-20 bg-sub-heading/60" aria-hidden="true" />

        <h3
          className="max-w-sm font-heading12 text-3xl font-bold uppercase leading-tight tracking-wide text-white md:text-4xl"
          id={`product-${index}`}
        >
          {item.title}
        </h3>

        <p
          className="mt-5 max-w-md text-base font-light leading-8 text-stone-300 md:text-lg"
          itemProp="description"
        >
          {item.description}
        </p>
      </section>

      {/* Center Product Image */}
      <div className="md:col-start-2 md:row-start-1">
        <ProductImage item={item} index={index} onClick={handleProductClick} />
      </div>
    </article>
  );
});

ProductItem.displayName = "ProductItem";

// Decorative Component
const SideVineDecoration = React.memo(({ position = "left" }) => (
  <div
    className={`absolute top-0 ${position}-0 w-24 h-full z-10 pointer-events-none opacity-20 select-none ${
      position === "right" ? "rotate-180" : ""
    }`}
    aria-hidden="true"
  >
    <div
      className="h-full w-full bg-repeat-y bg-contain opacity-60"
      style={{
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/gray-floral.png')",
      }}
    />
  </div>
));

SideVineDecoration.displayName = "SideVineDecoration";

// End Marker Component
const TimelineEndMarker = React.memo(() => (
  <div className="hidden md:flex justify-center mt-32">
    <div
      className="w-12 h-12 rounded-full border-2 border-[#8B4513]/30 flex items-center justify-center"
      aria-label="End of product timeline"
    >
      <div
        className="w-2 h-2 bg-[#8B4513] rounded-full animate-ping"
        aria-hidden="true"
      />
    </div>
  </div>
));

TimelineEndMarker.displayName = "TimelineEndMarker";

export const ProductLineSection = () => {
  // Memoize products and schema
  const products = useMemo(() => PRODUCT_LINE || [], []);
  const schema = useMemo(() => PRODUCT_LINE_SCHEMA, []);

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
        id="product-Line"
        className="relative py-32 bg-black overflow-hidden"
        aria-label="FirmLeather Product Line - Premium Leather Products"
        role="region"
      >
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-32" aria-hidden="true" />

        {/* Side Vine Decorations */}
        <SideVineDecoration position="left" />
        <SideVineDecoration position="right" />

        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Section Header */}
          <header className="text-center mb-32">
            <h2 className="font-heading12 text-5xl md:text-5xl font-bold text-amber-800 font-poppins relative inline-block">
              Product Line
              <span
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-sub-heading"
                aria-hidden="true"
              />
            </h2>
            <p className="mt-12 text-gray-300 max-w-xl mx-auto italic font-light leading-relaxed">
              Merging heritage craftsmanship with modern innovation to deliver
              the world&apos;s most versatile premium leather products for
              global brands and discerning customers.
            </p>
          </header>

          {/* Central Vertical Timeline Line */}
          <div
            className="absolute left-1/2 top-[300px] bottom-0 w-[2px] bg-gradient-to-b from-sub-heading via-[#8B4513]/50 to-transparent -translate-x-1/2 hidden md:block"
            aria-hidden="true"
          />

          {/* Products Timeline */}
          <div
            className="space-y-48 md:space-y-64 relative z-10"
            role="list"
            aria-label="Product categories"
          >
            {products.map((item, index) => (
              <ProductItem key={item.id || index} item={item} index={index} />
            ))}
          </div>

          {/* Timeline End Marker */}
          <TimelineEndMarker />
        </div>
      </section>
    </>
  );
};
