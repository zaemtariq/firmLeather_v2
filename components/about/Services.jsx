"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import { Layers, Scissors, ShoppingBag, CheckCircle2 } from "lucide-react";

// Icon mapping for dynamic rendering
const ICON_MAP = {
  layers: Layers,
  scissors: Scissors,
  shoppingBag: ShoppingBag,
};

// Configuration constants for services
const SERVICES = [
  {
    id: "leather-tannery",
    title: "Leather Tannery & Processing",
    description:
      "We operate a state-of-the-art modern leather tannery, producing premium-quality finished leather for multiple industrial and fashion applications. Our experienced leather technicians develop custom finishes, textures, and colors according to buyer specifications — ideal for wholesale leather suppliers, importers, and global fashion brands.",
    imageUrl: "/siteImages/factoryIMages/leather_tannery.jpg",
    icon: "layers",
    items: [
      "Sheep & goat leather (nappa & suede)",
      "Cow & buffalo leather (full-grain & corrected grain)",
      "Upper, Lining & Suede leather",
      "Garments & gloving materials",
    ],
    serviceType: "Leather tanning and processing",
  },
  {
    id: "leather-garments",
    title: "Leather Garment Manufacturing",
    description:
      "FirmLeather offers large-scale leather garment manufacturing for international fashion brands, clothing retailers, and private label leather clothing lines. We manage the complete production process from raw material sourcing to final packaging — ensuring consistent quality for bulk leather garment orders.",
    imageUrl: "/siteImages/factoryIMages/11.png",
    icon: "scissors",
    items: [
      "Custom pattern making & sample development",
      "Ethical raw material sourcing",
      "Precision cutting & stitching",
      "Quality control & export-ready packaging",
    ],
    serviceType: "Leather garment manufacturing",
  },
  {
    id: "leather-goods",
    title: "Leather Goods Manufacturing",
    description:
      "We produce durable and stylish leather goods for international wholesale and retail markets. Combining traditional artisan craftsmanship with modern production techniques to meet the highest standards of quality leather goods manufacturing.",
    imageUrl: "/siteImages/factoryIMages/12.png",
    icon: "shoppingBag",
    items: [
      "Custom leather goods (bags, wallets, belts & accessories)",
      "Private-label leather production for global brands",
      "High-volume bulk production capabilities",
      "Premium leather finishing & surface treatment",
    ],
    serviceType: "Leather goods manufacturing",
  },
];

// SEO Schema for services
const SERVICES_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FirmLeather",
  hasOfferingDescription: SERVICES.map((service) => ({
    "@type": "Service",
    name: service.title,
    description: service.description,
    serviceType: service.serviceType,
    provider: {
      "@type": "Organization",
      name: "FirmLeather",
    },
  })),
};

// Service Icon Component
const ServiceIconComponent = React.memo(({ iconKey }) => {
  const IconComponent = ICON_MAP[iconKey];
  return IconComponent ? (
    <div className="shrink-0">
      <IconComponent size={24} aria-hidden="true" />
    </div>
  ) : null;
});

ServiceIconComponent.displayName = "ServiceIconComponent";

// Service Image Component
const ServiceImage = React.memo(({ imageUrl, title }) => (
  <div className="h-64 overflow-hidden relative">
    <div
      className="absolute inset-0 bg-stone-900/20 group-hover:bg-stone-900/10 transition-colors z-10"
      aria-hidden="true"
    />
    <Image
      src={imageUrl}
      alt={`${title} - FirmLeather service showcase`}
      fill
      sizes="(min-width: 768px) 33vw, 100vw"
      className="object-cover transform transition-transform duration-700 group-hover:scale-110"
    />
    <div
      className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-md z-20 text-heading"
      aria-hidden="true"
    >
      <ServiceIconComponent
        iconKey={SERVICES.find((s) => s.title === title)?.icon}
      />
    </div>
  </div>
));

ServiceImage.displayName = "ServiceImage";

// Service Title Component
const ServiceTitle = React.memo(({ title, id }) => (
  <h3
    id={`service-${id}`}
    className="text-2xl font-serif font-bold text-stone-800 mb-3"
  >
    {title}
  </h3>
));

ServiceTitle.displayName = "ServiceTitle";

// Service Description Component
const ServiceDescription = React.memo(({ description }) => (
  <p
    className="text-justify text-stone-600 mb-6 leading-relaxed grow"
    itemProp="description"
  >
    {description}
  </p>
));

ServiceDescription.displayName = "ServiceDescription";

// Service Item Component
const ServiceItem = React.memo(({ item }) => (
  <div className="flex items-start gap-2 text-stone-700">
    <CheckCircle2
      className="w-5 h-5 text-heading shrink-0 mt-0.5"
      aria-hidden="true"
    />
    <span className="text-sm font-medium">{item}</span>
  </div>
));

ServiceItem.displayName = "ServiceItem";

// Service Items List Component
const ServiceItemsList = React.memo(({ items }) => (
  <div className="space-y-2 mt-auto" role="list">
    {items.map((item, idx) => (
      <ServiceItem key={`${item}-${idx}`} item={item} />
    ))}
  </div>
));

ServiceItemsList.displayName = "ServiceItemsList";

// Main Service Card Component
const ServiceCard = React.memo(({ service }) => (
  <article
    className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-stone-100"
    role="region"
    aria-labelledby={`service-${service.id}`}
    itemProp="hasOfferingDescription"
    itemScope
    itemType="https://schema.org/Service"
  >
    <ServiceImage imageUrl={service.imageUrl} title={service.title} />
    <div className="p-8 grow flex flex-col">
      <ServiceTitle title={service.title} id={service.id} />
      <ServiceDescription description={service.description} />
      <ServiceItemsList items={service.items} />
      <meta itemProp="name" content={service.title} />
      <meta itemProp="serviceType" content={service.serviceType} />
    </div>
  </article>
));

ServiceCard.displayName = "ServiceCard";

// Services Grid Component
const ServicesGrid = React.memo(({ services }) => (
  <div className="grid md:grid-cols-3 gap-8" role="list">
    {services.map((service) => (
      <ServiceCard key={service.id} service={service} />
    ))}
  </div>
));

ServicesGrid.displayName = "ServicesGrid";

// Section Header Component
const SectionHeader = React.memo(() => (
  <header className="text-center mb-16">
    <h2 className="text-leather-600 font-bold uppercase tracking-widest text-sm mb-2">
      Our Expertise
    </h2>
    <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-900">
      Comprehensive Manufacturing Services
    </h1>
  </header>
));

SectionHeader.displayName = "SectionHeader";

// Main Services Component
const Services = () => {
  const schema = useMemo(() => SERVICES_SCHEMA, []);
  const services = useMemo(() => SERVICES, []);

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
        className="py-10 bg-stone-50"
        aria-label="FirmLeather Manufacturing Services"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <div className="container mx-auto px-6">
          <SectionHeader />
          <ServicesGrid services={services} />
        </div>
      </section>
    </>
  );
};

export default Services;
