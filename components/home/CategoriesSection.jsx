"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { useCategoryStore } from "../store/useStore";
import {
  Scissors,
  Scroll,
  Palette,
  Ruler,
  Factory,
  HandMetal,
  Layers,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";

// Category configuration with enhanced SEO content
const CATEGORIES = [
  {
    id: "sports",
    name: "Sports Gear",
    categoryKey: "SPORTS",
    image: "/siteImages/factoryIMages/sports_gear (2).jpg",
    imageAlt:
      "Premium leather sports gear including professional baseball gloves and golf gloves from FirmLeather",
    description:
      "Premium leather sports equipment engineered for professional-grade performance and durability",
    features: [
      {
        icon: HandMetal,
        text: "Golf & Baseball Gloves",
        description:
          "Professional-grade leather gloves for enhanced grip and performance",
      },
      {
        icon: ShieldCheck,
        text: "Pro-Grade Durability",
        description:
          "Built to withstand intensive sports use and repeated wear",
      },
      {
        icon: Scissors,
        text: "Custom Fit Ergonomics",
        description:
          "Precision-engineered for optimal comfort and functionality",
      },
    ],
  },
  {
    id: "apparel",
    name: "Apparel",
    categoryKey: "APPAREL",
    image: "/siteImages/factoryIMages/leather_apparel.avif",
    imageAlt:
      "High-quality leather apparel collection including jackets, belts, and outerwear from FirmLeather",
    description:
      "Sophisticated leather apparel featuring bespoke jackets, premium belts, and custom outerwear solutions",
    features: [
      {
        icon: Ruler,
        text: "Bespoke Jackets & Belts",
        description: "Custom-made tailored leather jackets and designer belts",
      },
      {
        icon: Palette,
        text: "Premium Dye Finishes",
        description:
          "Advanced finishing techniques for rich, lasting color and texture",
      },
      {
        icon: Factory,
        text: "Bulk White-Label Ready",
        description: "B2B manufacturing solutions for brands and retailers",
      },
    ],
  },
  {
    id: "accessories",
    name: "Accessories",
    categoryKey: "ACCESSORIES",
    image: "/siteImages/factoryIMages/leather_accessories.jpg",
    imageAlt:
      "Luxury leather accessories including handcrafted wallets, purses, and handbags by FirmLeather",
    description:
      "Luxury leather accessories collection featuring hand-stitched wallets, purses, and premium handbags",
    features: [
      {
        icon: ShoppingBag,
        text: "High-End Leather Purses",
        description:
          "Sophisticated leather purses designed for discerning customers",
      },
      {
        icon: Scroll,
        text: "Fine Italian Grain",
        description:
          "Premium Italian full-grain leather with authentic character",
      },
      {
        icon: Scissors,
        text: "Hand-Stitched Detail",
        description:
          "Artisanal craftsmanship with meticulous attention to detail",
      },
    ],
  },
  {
    id: "raw-materials",
    name: "Raw Materials",
    categoryKey: "FINISHED LEATHER",
    image: "/siteImages/factoryIMages/raw_leather (2).jpg",
    imageAlt:
      "Finished leather hides and raw materials for manufacturing - chrome and vegetable tanned leather from FirmLeather",
    description:
      "High-quality finished leather hides and raw materials including chrome and vegetable-tanned options",
    features: [
      {
        icon: Layers,
        text: "Bulk Raw Hides",
        description: "Wholesale leather hides for industrial manufacturing",
      },
      {
        icon: Factory,
        text: "Chrome & Veg Tanned",
        description: "Multiple tanning methods for diverse applications",
      },
      {
        icon: Ruler,
        text: "Variable Weight/Ounce",
        description:
          "Flexible specifications to meet specific project requirements",
      },
    ],
  },
];

// Schema markup for product categories with enhanced structured data
const PRODUCT_CATEGORIES_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Leather Product Categories - FirmLeather",
  description:
    "Explore FirmLeather's premium leather product categories: professional sports gear, luxury apparel, fine accessories, and high-quality raw materials for manufacturing",
  url: "https://www.firmleather.com/collections",
  mainEntity: {
    "@type": "ItemCollection",
    name: "Premium Leather Goods Categories",
    numberOfItems: 4,
    itemListElement: CATEGORIES.map((cat, index) => ({
      "@type": "Product",
      position: index + 1,
      name: cat.name,
      description: cat.description,
      category: cat.name,
      url: `https://www.firmleather.com/products/${cat.categoryKey.toLowerCase()}`,
      image: cat.image,
      brand: {
        "@type": "Brand",
        name: "FirmLeather",
        url: "https://www.firmleather.com",
      },
      offers: {
        "@type": "AggregateOffer",
        availability: "https://schema.org/InStock",
        priceCurrency: "USD",
      },
    })),
  },
};

// CategoryCard Component with enhanced semantic markup
const CategoryCard = React.memo(({ category, onCategorySelect }) => {
  const handleClick = useCallback(() => {
    onCategorySelect(category.categoryKey);
  }, [category.categoryKey, onCategorySelect]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick],
  );

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="group relative h-[500px] overflow-hidden bg-black cursor-pointer rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300"
      aria-label={`Explore ${category.name}: ${category.description}`}
      data-category={category.categoryKey}
    >
      {/* Background Image */}
      <img
        src={category.image}
        alt={category.imageAlt}
        className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-50"
        loading="lazy"
        decoding="async"
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-60"
        aria-hidden="true"
      />

      {/* Hidden category description for screen readers */}
      <span className="sr-only">{category.description}</span>

      {/* Content */}
      <div className="absolute bottom-2 left-0 w-full p-6 text-white transition-all duration-500 transform translate-y-8 group-hover:translate-y-0">
        {/* Features - Hidden until hover */}
        <div className="text-sm text-stone-300 mb-6 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {category.features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <span
                key={index}
                className="flex items-center"
                title={feature.description}
              >
                <IconComponent
                  className="text-leather-400 mr-2 w-4 h-4 flex-shrink-0"
                  aria-hidden="true"
                />
                {feature.text}
              </span>
            );
          })}
        </div>

        {/* Title with semantic markup */}
        <h3 className="text-2xl font-serif font-bold mb-3" itemProp="name">
          {category.name}
        </h3>

        {/* Hidden full feature descriptions for SEO */}
        <div className="sr-only">
          {category.features.map((feature, index) => (
            <div key={index}>{feature.description}</div>
          ))}
        </div>
      </div>
    </button>
  );
});

CategoryCard.displayName = "CategoryCard";

export default function CategoriesSection() {
  const { setActiveCategory } = useCategoryStore();
  const router = useRouter();

  // Memoize categories and schema
  const categories = useMemo(() => CATEGORIES, []);
  const schema = useMemo(() => PRODUCT_CATEGORIES_SCHEMA, []);

  // Memoize category change handler
  const handleCategoryChange = useCallback(
    (categoryKey) => {
      setActiveCategory(categoryKey);
      router.push("/products");
    },
    [setActiveCategory, router],
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

      <div>
        {/* Product Category Section */}
        <section
          id="collections"
          className="py-24 bg-stone-50"
          aria-label="Leather product categories"
          role="region"
        >
          <div className="max-w-[1200px] mx-auto px-5">
            {/* Section Header */}
            <header className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold mb-3 text-stone-900">
                Our Leather Verticals
              </h2>
              <p className="text-stone-500 font-serif italic text-xl">
                From raw hides to precision-engineered finished goods
              </p>
            </header>

            {/* Categories Grid */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              role="list"
            >
              {categories.map((category) => (
                <div key={category.id} role="listitem">
                  <CategoryCard
                    category={category}
                    onCategorySelect={handleCategoryChange}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
