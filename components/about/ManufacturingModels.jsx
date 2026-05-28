"use client";
import React, { useMemo } from "react";
import { PenTool, Box, Tag, Scissors } from "lucide-react";

// Icon mapping for dynamic rendering
const ICON_MAP = {
  penTool: PenTool,
  box: Box,
  tag: Tag,
  scissors: Scissors,
};

// Configuration constants for manufacturing models
const MANUFACTURING_MODELS = [
  {
    id: "oem",
    title: "OEM",
    subtitle: "Original Equipment Manufacturer",
    description:
      "Custom leather manufacturing based on buyer-provided designs, patterns, and technical specifications. We bring your exact vision to life with precision craftsmanship and strict quality control — ideal for established leather brands and international buyers seeking reliable OEM leather production partners",
    icon: "penTool",
    service: "Custom leather manufacturing",
  },
  {
    id: "odm",
    title: "ODM",
    subtitle: "Original Design Manufacturer",
    description:
      "End-to-end design and production of ready-made leather garments and leather goods. Choose from our catalog of trend-conscious, market-ready designs — perfect for startups, retailers, and importers looking for turnkey ODM leather manufacturing solutions without the overhead of in-house design teams.",
    icon: "box",
    service: "Design and production services",
  },
  {
    id: "private-label",
    title: "Private Label",
    subtitle: "Retailer Branding",
    description:
      "Premium leather products manufactured and branded exclusively under your retailer's name and label. We handle the entire private label leather production process; you build and grow your brand. A preferred model for e-commerce sellers, boutique retailers, and fashion labels entering the leather goods market.",
    icon: "tag",
    service: "Private label manufacturing",
  },
  {
    id: "cmt",
    title: "CMT",
    subtitle: "Cut, Make & Trim",
    description:
      "Professional cutting, stitching, and assembling of leather garments and accessories using buyer-supplied materials, patterns, and designs. A flexible and cost-effective CMT leather manufacturing option tailored for specific production runs, sampling, or small-to-large batch needs.",
    icon: "scissors",
    service: "Cut, make, and trim services",
  },
];

// SEO Schema markup for services
const MANUFACTURING_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FirmLeather",
  hasOfferingDescription: MANUFACTURING_MODELS.map((model) => ({
    "@type": "Offer",
    name: model.title,
    description: model.description,
    serviceType: model.service,
  })),
};

// Model Icon Component
const ModelIcon = React.memo(({ iconKey }) => {
  const IconComponent = ICON_MAP[iconKey];
  return (
    <div
      className="mb-6 bg-heading w-16 h-16 rounded-full flex items-center justify-center shadow-lg shrink-0"
      role="presentation"
      aria-hidden="true"
    >
      {IconComponent && (
        <IconComponent
          className="w-8 h-8 text-leather-100"
          aria-hidden="true"
        />
      )}
    </div>
  );
});

ModelIcon.displayName = "ModelIcon";

// Model Title Component
const ModelTitle = React.memo(({ title, id }) => (
  <h4
    id={`manufacturing-${id}`}
    className="text-xl font-bold mb-1 text-amber-800"
  >
    {title}
  </h4>
));

ModelTitle.displayName = "ModelTitle";

// Model Subtitle Component
const ModelSubtitle = React.memo(({ subtitle }) => (
  <p className="text-sub-heading text-sm font-medium mb-4 uppercase tracking-wide">
    {subtitle}
  </p>
));

ModelSubtitle.displayName = "ModelSubtitle";

// Model Description Component
const ModelDescription = React.memo(({ description }) => (
  <p className="text-stone-300 text-sm leading-relaxed" itemProp="description">
    {description}
  </p>
));

ModelDescription.displayName = "ModelDescription";

// Model Card Component
const ModelCard = React.memo(({ model }) => (
  <article
    className="bg-stone-800 p-8 text-justify rounded-lg hover:bg-stone-700 transition-all duration-300 border-t-4 border-sub-heading"
    role="region"
    aria-labelledby={`manufacturing-${model.id}`}
    itemProp="hasOfferingDescription"
    itemScope
    itemType="https://schema.org/Offer"
  >
    <ModelIcon iconKey={model.icon} />
    <ModelTitle title={model.title} id={model.id} />
    <ModelSubtitle subtitle={model.subtitle} />
    <ModelDescription description={model.description} />
    <meta itemProp="name" content={model.title} />
    <meta itemProp="serviceType" content={model.service} />
  </article>
));

ModelCard.displayName = "ModelCard";

// Models Grid Component
const ModelsGrid = React.memo(({ models }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
    {models.map((model) => (
      <ModelCard key={model.id} model={model} />
    ))}
  </div>
));

ModelsGrid.displayName = "ModelsGrid";

// Section Header Component
const SectionHeader = React.memo(() => (
  <header className="text-center mb-16">
    <h2 className="text-3xl md:text-5xl font-serif font-bold text-amber-800">
      Manufacturing Models
    </h2>
  </header>
));

SectionHeader.displayName = "SectionHeader";

// Main ManufacturingModels Component
const ManufacturingModels = () => {
  const schema = useMemo(() => MANUFACTURING_SCHEMA, []);
  const models = useMemo(() => MANUFACTURING_MODELS, []);

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
        id="manufacturingmodels"
        className="py-10 bg-stone-900 text-white"
        aria-label="FirmLeather Manufacturing Models and Services"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <div className="container mx-auto  px-6">
          <SectionHeader />
          <ModelsGrid models={models} />
        </div>
      </section>
    </>
  );
};

export default ManufacturingModels;
