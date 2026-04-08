"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import { PRODUCT_LINE } from "@/components/constants/constants";
import { useCategoryStore } from "../store/useStore";

// Configuration constants
const INTERSECTION_OPTIONS = {
  threshold: 0.2,
};

const ANIMATION_DELAYS = {
  transition: 1000,
  spin: "20s",
};

// SEO Schema markup
const PRODUCT_LINE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "FirmLeather Product Line",
  description:
    "Complete leather product line merging heritage with innovation for versatile applications",
  itemListElement: (PRODUCT_LINE || []).map((item, index) => ({
    "@type": "Product",
    position: index + 1,
    name: item.title,
    description: item.description,
    image: item.imageUrl,
    category: item.Url,
  })),
};

// NumberDisplay Component - Reusable
const NumberDisplay = React.memo(({ number, className = "" }) => (
  <span className={`serif font-bold select-none ${className}`}>
    {(number + 1).toString().padStart(2, "0")}
  </span>
));

NumberDisplay.displayName = "NumberDisplay";

// ProductImage Component for desktop
const DesktopProductImage = React.memo(({ item, index }) => {
  const number = (index + 1).toString().padStart(2, "0");

  return (
    <div
      className="cursor-pointer absolute left-1/2 -translate-x-1/2 z-20 hidden md:block"
      role="presentation"
    >
      <div className="group relative">
        {/* Main Image Circle */}
        <div
          className="w-56 h-56 rounded-full border-8 border-white shadow-2xl overflow-hidden bg-white flex items-center justify-center p-1 transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-3"
          aria-label={`Product: ${item.title}`}
        >
          <img
            src={item.imageUrl}
            alt={`${item.title} - Premium leather product from FirmLeather`}
            className="w-full h-full object-cover rounded-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0 bg-[#4A3728]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
            aria-hidden="true"
          />
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

DesktopProductImage.displayName = "DesktopProductImage";

// ProductImage Component for mobile
const MobileProductImage = React.memo(({ item, index }) => {
  const number = (index + 1).toString().padStart(2, "0");

  return (
    <div className="w-full md:w-1/2 flex justify-center md:hidden">
      <div className="relative">
        <div className="w-64 h-64 rounded-full border-4 border-white shadow-xl overflow-hidden">
          <img
            src={item.imageUrl}
            alt={`${item.title} - Premium leather product from FirmLeather`}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div
          className="absolute -top-4 -left-4 w-12 h-12 bg-[#8B4513] text-white rounded-full flex items-center justify-center font-bold serif shadow-lg"
          aria-hidden="true"
        >
          {number}
        </div>
      </div>
    </div>
  );
});

MobileProductImage.displayName = "MobileProductImage";

// ProductItem Component - Main reusable component
const ProductItem = React.memo(({ item, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);
  const { setActiveCategory } = useCategoryStore();
  const router = useRouter();

  // Memoize number display
  const number = useMemo(
    () => (index + 1).toString().padStart(2, "0"),
    [index],
  );

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
      className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-0 transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
      role="listitem"
    >
      {/* Content Section */}
      <section
        className={`w-full md:w-1/2 flex flex-col ${
          item.side === "right"
            ? "md:order-2 md:pl-40"
            : "md:order-1 md:pr-40 md:items-end md:text-right"
        }`}
      >
        <NumberDisplay
          number={index}
          className="text-[#8B4513] text-5xl mb-2 opacity-20"
        />
        <h3
          className="text-2xl md:text-3xl font-bold mb-4 tracking-widest text-sub-heading serif uppercase border-b-2 border-[#6B8E23]/10 pb-2 inline-block"
          id={`product-${index}`}
        >
          {item.title}
        </h3>
        <p
          className="text-gray-300 font-light text-xl max-w-md leading-relaxed"
          itemProp="description"
        >
          {item.description}
        </p>
      </section>

      {/* Desktop Product Image */}
      <div onClick={handleProductClick}>
        <DesktopProductImage item={item} index={index} />
      </div>

      {/* Mobile Product Image */}
      <MobileProductImage item={item} index={index} />

      {/* Desktop Spacing */}
      <div
        className={`hidden md:block w-1/2 ${
          item.side === "right" ? "order-1" : "order-2"
        }`}
        aria-hidden="true"
      />
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
            <h2 className="font-heading12 text-5xl md:text-5xl font-bold text-heading font-poppins relative inline-block">
              Product Line
              <span
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-sub-heading"
                aria-hidden="true"
              />
            </h2>
            <p className="mt-12 text-gray-300 max-w-xl mx-auto italic font-light leading-relaxed">
              Merging heritage craftsmanship with modern innovation to deliver
              the world's most versatile premium leather products for global
              brands and discerning customers.
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
