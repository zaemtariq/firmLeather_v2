"use client";
import React, { useMemo } from "react";
import Image from "next/image";

// SEO Schema markup for timeline item
const createTimelineItemSchema = (product, position) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.title,
  description: product.description,
  image: product.imageUrl,
  position: position,
});

// Timeline Item Image - Desktop
const TimelineDesktopImage = React.memo(({ product, index }) => {
  const altText = useMemo(
    () =>
      `${product.title} - FirmLeather product displayed in timeline view (item ${index + 1})`,
    [product.title, index],
  );

  return (
    <div className="hidden md:flex w-2/12 justify-center relative items-center">
      <div
        className="relative w-48 h-48 rounded-full border-4 border-gray-100 overflow-hidden shadow-lg bg-white z-10 p-2 transform transition-transform duration-300 hover:scale-105"
        role="img"
        aria-label={altText}
      >
        <Image
          src={product.imageUrl}
          alt={altText}
          fill
          sizes="192px"
          className="rounded-full object-cover p-2"
        />
      </div>
    </div>
  );
});

TimelineDesktopImage.displayName = "TimelineDesktopImage";

// Timeline Item Image - Mobile
const TimelineMobileImage = React.memo(({ product, index }) => {
  const altText = useMemo(
    () =>
      `${product.title} - FirmLeather product displayed in timeline view (item ${index + 1})`,
    [product.title, index],
  );

  return (
    <div className="md:hidden mt-6 flex justify-center">
      <div
        className="relative w-40 h-40 rounded-full border-4 border-gray-100 overflow-hidden shadow-md"
        role="img"
        aria-label={altText}
      >
        <Image
          src={product.imageUrl}
          alt={altText}
          fill
          sizes="160px"
          className="object-cover"
        />
      </div>
    </div>
  );
});

TimelineMobileImage.displayName = "TimelineMobileImage";

// Timeline Item Content
const TimelineItemContent = React.memo(({ product, isEven }) => (
  <div
    className={`w-full md:w-5/12 px-8 flex flex-col ${
      isEven ? "md:items-start text-left" : "md:items-end text-right"
    }`}
    role="article"
  >
    <h3
      className="text-lg md:text-xl font-serif font-semibold tracking-widest text-gray-800 mb-3"
      id={`timeline-${product.title?.replace(/\s+/g, "-").toLowerCase()}`}
    >
      {product.title}
    </h3>
    <p
      className="text-sm md:text-base text-gray-600 leading-relaxed max-w-md"
      itemProp="description"
    >
      {product.description}
    </p>
  </div>
));

TimelineItemContent.displayName = "TimelineItemContent";

// Layout Spacer Component
const TimelineLayoutSpacer = React.memo(() => (
  <div className="hidden md:block w-5/12" aria-hidden="true" />
));

TimelineLayoutSpacer.displayName = "TimelineLayoutSpacer";

// Main TimelineItem Component
const TimelineItem = React.memo(({ product, index }) => {
  const isEven = useMemo(() => index % 2 === 1, [index]);

  const schema = useMemo(
    () => createTimelineItemSchema(product, index + 1),
    [product, index],
  );

  const containerClasses = useMemo(
    () =>
      `flex flex-col md:flex-row items-center justify-center w-full min-h-[300px] mb-16 md:mb-0 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`,
    [isEven],
  );

  return (
    <>
      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <article
        className={containerClasses}
        role="listitem"
        aria-label={`Timeline item ${index + 1}: ${product.title}`}
      >
        {/* Content Side */}
        <TimelineItemContent product={product} isEven={isEven} />

        {/* Desktop Central Marker */}
        <TimelineDesktopImage product={product} index={index} />

        {/* Placeholder Side to keep layout balance */}
        <TimelineLayoutSpacer />

        {/* Mobile Image */}
        <TimelineMobileImage product={product} index={index} />
      </article>
    </>
  );
});

TimelineItem.displayName = "TimelineItem";

export default TimelineItem;
