import React, { useMemo } from "react";
import { Factory, CheckCircle2, PenTool } from "lucide-react";

// Services configuration
const SERVICES = [
  {
    id: "manufacturing",
    title: "Manufacturing For Brands",
    icon: Factory,
    image: "/siteImages/factoryIMages/leather_manufacturer.jpg",
    imageAlt:
      "Professional leather manufacturing facility at FirmLeather for brand partnerships",
    description:
      "Scale your business with our private label manufacturing services. We produce high-quality leather goods according to your brand's designs, specifications, and quality standards. Perfect for startups and established brands.",
    features: [
      {
        text: "Prototype development & sampling",
        description: "Quick turnaround on custom prototypes and samples",
      },
      {
        text: "Custom hardware & branding embossing",
        description: "Premium finishing touches and brand personalization",
      },
      {
        text: "Low MOQs for startups",
        description: "Flexible minimum order quantities for growing brands",
      },
    ],
    ctaText: "Partner With Us",
    ctaHref: "#contact",
  },
  {
    id: "customization",
    title: "Customized For You",
    icon: PenTool,
    image: "/siteImages/factoryIMages/cumtomize_for_you.jpg",
    imageAlt:
      "Custom leather craftsmanship - personalized leather goods from FirmLeather",
    description:
      "Whether for corporate gifting or personal indulgence, we create bespoke leather pieces tailored to your exact preferences, style, and requirements.",
    features: [
      {
        text: "Personalized monograms & engraving",
        description: "Custom engraving and monogramming services",
      },
      {
        text: "Choice of premium leathers & colors",
        description:
          "Wide selection of high-quality leather types and finishes",
      },
      {
        text: "Made-to-order sizing",
        description: "Custom dimensions and specifications to fit your needs",
      },
    ],
    ctaText: "Start Customizing",
    ctaHref: "#contact",
  },
];

// Schema markup for services
const SERVICES_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "FirmLeather Services",
  description:
    "Custom leather manufacturing, private label production, and bespoke leather goods services for brands and individual customers",
  image: "https://www.firmleather.com/logo.png",
  url: "https://www.firmleather.com/services",
  areaServed: {
    "@type": "Country",
    name: "Global",
  },
  serviceArea: {
    "@type": "AdministrativeArea",
    name: ["Private Label Manufacturing", "Custom Leather Goods"],
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Leather Services",
    itemListElement: SERVICES.map((service, index) => ({
      "@type": "OfferCatalog",
      position: index + 1,
      name: service.title,
      description: service.description,
    })),
  },
};

// ServiceCard Component - Reusable and memoized
const ServiceCard = React.memo(({ service }) => {
  const Icon = service.icon;

  return (
    <article
      className="flex flex-col h-full rounded-2xl overflow-hidden shadow-lg border border-leather-100 group hover:shadow-2xl transition-all duration-300"
      itemScope
      itemType="https://schema.org/Service"
    >
      {/* Image Section */}
      <div className="h-64 overflow-hidden relative bg-gray-200">
        <img
          src={service.image}
          alt={service.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          itemProp="image"
        />
        <div
          className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"
          aria-hidden="true"
        />
      </div>

      {/* Content Section */}
      <div className="p-8 md:p-10 grow flex flex-col">
        {/* Header with Icon and Title */}
        <div className="flex items-center mb-6 gap-4">
          <div
            className="p-3 bg-heading rounded-lg text-white shadow-md shrink-0"
            aria-hidden="true"
          >
            <Icon size={24} />
          </div>
          <h3
            className="text-2xl font-serif font-bold text-leather-900"
            itemProp="name"
          >
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <p
          className="text-gray-600 mb-8 leading-relaxed grow"
          itemProp="description"
        >
          {service.description}
        </p>

        {/* Features List */}
        <ul
          className="space-y-3 mb-8"
          role="list"
          aria-label={`${service.title} features`}
        >
          {service.features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm text-gray-700"
              role="listitem"
              title={feature.description}
            >
              <CheckCircle2
                className="w-4 h-4 text-sub-heading mr-1 mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href={service.ctaHref}
          className="inline-block w-full text-center py-3 border-2 border-leather-900 text-leather-900 font-bold uppercase tracking-wider text-sm hover:bg-primary hover:text-white hover:border-primary transition-colors rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          aria-label={`${service.ctaText} - ${service.title}`}
        >
          {service.ctaText}
        </a>
      </div>
    </article>
  );
});

ServiceCard.displayName = "ServiceCard";

export default function CustomServicesSection() {
  // Memoize data
  const services = useMemo(() => SERVICES, []);
  const schema = useMemo(() => SERVICES_SCHEMA, []);

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
        className="py-20 bg-white border-t border-leather-100"
        aria-label="Our Leather Services - Manufacturing and Customization"
        role="region"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <header className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-leather-900">
              Beyond Off-The-Shelf Leather
            </h2>
            <div
              className="w-40 h-1 bg-sub-heading mx-auto mt-2"
              aria-hidden="true"
            />
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We don't just sell leather products — we build lasting
              partnerships. Discover our dedicated leather manufacturing
              services for global brands, retailers, and individual buyers
              looking for reliable, high-quality leather sourcing and
              customization solutions.
            </p>
          </header>

          {/* Services Grid */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            role="list"
            aria-label="Available Services"
          >
            {services.map((service) => (
              <div key={service.id} role="listitem">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
