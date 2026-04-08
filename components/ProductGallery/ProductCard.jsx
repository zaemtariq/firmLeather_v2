"use client";

import React, { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Eye, Mail, ArrowRight, Package } from "lucide-react";
import { useRouter } from "next/navigation";

// ============================================================================
// CONFIGURATION CONSTANTS
// ============================================================================
/**
 * Feature display limit in hover overlay
 * @type {number}
 */
const FEATURE_LIMIT = 3;

/**
 * Animation configuration for product card
 * @type {Object}
 */
const CARD_ANIMATIONS = {
  container: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  },
  badge: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { delay: 0.2 },
  },
  leftBadge: {
    initial: { x: -20, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    transition: { delay: 0.2 },
  },
  rightBadge: {
    initial: { x: 20, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    transition: { delay: 0.2 },
  },
  featureItem: (index) => ({
    initial: { x: -20, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    transition: { delay: 0.1 * index },
  }),
  quickAction: {
    whileHover: { scale: 1.1, rotate: 5 },
  },
};

/**
 * Button text and labels
 * @type {Object}
 */
const BUTTON_LABELS = {
  VIEW_DETAILS: "View Details",
  REQUEST_QUOTE: "Request Quote",
  KEY_FEATURES: "Key Features",
};

/**
 * Product schema for SEO/structured data
 * @type {Function}
 */
const generateProductSchema = (product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.title,
  productID: product.productCode,
  category: product.category,
  description: product.feature?.slice(0, 3).join("; ") || product.title,
  image: product.imageUrl?.[0] || "",
});

// ============================================================================
// SUB-COMPONENTS
// ============================================================================
/**
 * Product image container component
 * @component
 */
const ProductImageContainer = React.memo(({ product, onViewDetails }) => (
  <div className="relative aspect-3/4 overflow-hidden bg-linear-to-br from-leather-50 to-leather-100">
    <img
      src={product.imageUrl?.[0] || ""}
      alt={product.title}
      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
    />

    {/* Gradient Overlay */}
    <div
      className="absolute inset-0 bg-linear-to-t from-leather-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"
      aria-hidden="true"
    />
  </div>
));

ProductImageContainer.displayName = "ProductImageContainer";

/**
 * Category and MOQ badge component
 * @component
 */
const ProductBadges = React.memo(({ product }) => (
  <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-20">
    {/* Category Badge */}
    <motion.div
      {...CARD_ANIMATIONS.leftBadge}
      className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg"
    >
      <span className="text-[10px] font-bold tracking-wider text-leather-800 uppercase">
        {product.category}
      </span>
    </motion.div>

    {/* MOQ Badge */}
    <motion.div
      {...CARD_ANIMATIONS.rightBadge}
      className="bg-leather-900/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5"
    >
      <Package size={12} className="text-amber-400" aria-hidden="true" />
      <span className="text-[10px] font-bold tracking-wider text-white">
        MOQ: {product.moq}
      </span>
    </motion.div>
  </div>
));

ProductBadges.displayName = "ProductBadges";

/**
 * Featured item in hover overlay
 * @component
 */
const FeatureItem = React.memo(({ feature, index }) => (
  <motion.div
    {...CARD_ANIMATIONS.featureItem(index)}
    className="flex items-start gap-2 text-sm text-leather-50"
  >
    <span className="text-amber-400 mt-0.5" aria-hidden="true">
      •
    </span>
    <span className="font-light leading-relaxed">{feature}</span>
  </motion.div>
));

FeatureItem.displayName = "FeatureItem";

/**
 * Features list component
 * @component
 */
const FeaturesSection = React.memo(({ features }) => {
  if (!features || features.length === 0) return null;

  return (
    <div className="hidden sm:block space-y-2">
      <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3 text-center">
        {BUTTON_LABELS.KEY_FEATURES}
      </h4>
      <div className="space-y-1.5">
        {features.slice(0, FEATURE_LIMIT).map((feat, i) => (
          <FeatureItem key={`feature-${i}`} feature={feat} index={i} />
        ))}
      </div>
    </div>
  );
});

FeaturesSection.displayName = "FeaturesSection";

/**
 * Action button component
 * @component
 */
const ActionButton = React.memo(
  ({ variant, onClick, label, icon: Icon, arrowIcon: ArrowIcon }) => {
    const isPrimary = variant === "primary";

    return (
      <button
        onClick={onClick}
        aria-label={label}
        className={`group/btn relative flex w-full items-center justify-center gap-2 py-3.5 px-4 text-xs font-bold uppercase tracking-widest overflow-hidden transition-all ${
          isPrimary
            ? "bg-linear-to-r from-primary to-primary-hover text-white hover:shadow-lg hover:scale-[1.02]"
            : "border-2 border-white bg-transparent text-white hover:bg-white hover:text-leather-900 hover:scale-[1.02]"
        } active:scale-[0.98]`}
      >
        <span
          className={
            isPrimary
              ? "absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"
              : ""
          }
          aria-hidden="true"
        />
        <Icon size={16} className="relative z-10" aria-hidden="true" />
        <span className="relative z-10">{label}</span>
        {ArrowIcon && (
          <ArrowIcon
            size={14}
            className="relative z-10 opacity-0 -ml-4 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all duration-300"
            aria-hidden="true"
          />
        )}
      </button>
    );
  },
);

ActionButton.displayName = "ActionButton";

/**
 * Hover overlay with actions component
 * @component
 */
const HoverOverlay = React.memo(
  ({ product, onViewDetails, onRequestQuote }) => (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
      <div className="w-full translate-y-6 transform transition-all duration-500 group-hover:translate-y-0 space-y-5">
        {/* Features List */}
        <FeaturesSection features={product.feature} />

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <ActionButton
            variant="primary"
            onClick={onViewDetails}
            label={BUTTON_LABELS.VIEW_DETAILS}
            icon={Eye}
            arrowIcon={ArrowRight}
          />

          <ActionButton
            variant="secondary"
            onClick={onRequestQuote}
            label={BUTTON_LABELS.REQUEST_QUOTE}
            icon={Mail}
          />
        </div>
      </div>
    </div>
  ),
);

HoverOverlay.displayName = "HoverOverlay";

/**
 * Quick action button component
 * @component
 */
const QuickActionButton = React.memo(({ onClick }) => (
  <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    <motion.button
      {...CARD_ANIMATIONS.quickAction}
      onClick={onClick}
      aria-label="Quick view product"
      className="bg-amber-500 hover:bg-amber-600 p-2 rounded-full shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
    >
      <ArrowRight size={16} className="text-white" aria-hidden="true" />
    </motion.button>
  </div>
));

QuickActionButton.displayName = "QuickActionButton";

/**
 * Product content area component
 * @component
 */
const ProductContent = React.memo(({ product }) => (
  <div className="grow p-2 bg-linear-to-b from-white to-leather-50/30">
    {/* Title */}
    <h3 className="font-playfair text-center font-semibold tracking-wide text-leather-900 md:text-xl mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
      {product.title}
    </h3>

    {/* Product Code */}
    <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-leather-200/50">
      <span className="text-[10px] font-medium text-leather-500 uppercase tracking-wider">
        Product Code:
      </span>
      <code className="text-xs font-bold text-leather-700 tracking-wide bg-leather-100/50 px-2 py-0.5 rounded font-mono">
        {product.productCode}
      </code>
    </div>

    {/* Bottom Accent Line */}
    <div className="mt-3 h-1 w-0 bg-linear-to-r from-primary via-amber-500 to-primary group-hover:w-full transition-all duration-500 rounded-full" />
  </div>
));

ProductContent.displayName = "ProductContent";

/**
 * Card border glow effect component
 * @component
 */
const CardGlowEffect = React.memo(() => (
  <div
    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
    aria-hidden="true"
  >
    <div className="absolute inset-0 rounded-lg bg-linear-to-r from-primary/20 via-amber-500/20 to-primary/20 blur-xl" />
  </div>
));

CardGlowEffect.displayName = "CardGlowEffect";

// ============================================================================
// MAIN COMPONENT
// ============================================================================
/**
 * Product card component for displaying products in grid
 * Displays product image, badges, features, and action buttons with animations
 *
 * @component
 * @param {Object} props
 * @param {Object} props.product - Product data object
 * @param {string} props.product.title - Product title
 * @param {string} props.product.productCode - Unique product code
 * @param {string} props.product.category - Product category
 * @param {number} props.product.moq - Minimum order quantity
 * @param {Array<string>} props.product.imageUrl - Array of image URLs
 * @param {Array<string>} [props.product.feature] - Array of product features
 * @param {Function} props.onClick - Callback when product is clicked
 * @returns {React.ReactElement} Rendered product card
 *
 * @example
 * <ProductCard
 *   product={productData}
 *   onClick={(product) => handleProductClick(product)}
 * />
 */
const ProductCard = React.memo(({ product, onClick }) => {
  const router = useRouter();

  // Handle request quote button
  const handleRequestQuote = useCallback(
    (e) => {
      e.stopPropagation();
      if (product?.productCode) {
        router.push(`/get-quote/${product.productCode}`);
      }
    },
    [product?.productCode, router],
  );

  // Handle view details button
  const handleViewDetails = useCallback(
    (e) => {
      e.stopPropagation();
      onClick?.(product);
    },
    [product, onClick],
  );

  // Handle card click
  const handleCardClick = useCallback(() => {
    onClick?.(product);
  }, [product, onClick]);

  // Memoized product schema
  const productSchema = useMemo(
    () => generateProductSchema(product),
    [product],
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <motion.div
        {...CARD_ANIMATIONS.container}
        className="group relative flex flex-col h-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-leather-100/20"
        onClick={handleCardClick}
        role="article"
        itemScope
        itemType="https://schema.org/Product"
      >
        <meta itemProp="name" content={product.title} />
        <meta itemProp="productID" content={product.productCode} />
        <meta itemProp="category" content={product.category} />
        {product.imageUrl?.[0] && (
          <meta itemProp="image" content={product.imageUrl[0]} />
        )}

        {/* Image Container */}
        <ProductImageContainer
          product={product}
          onViewDetails={handleViewDetails}
        />

        {/* Badges */}
        <ProductBadges product={product} />

        {/* Hover Overlay */}
        <HoverOverlay
          product={product}
          onViewDetails={handleViewDetails}
          onRequestQuote={handleRequestQuote}
        />

        {/* Quick Action Button */}
        <QuickActionButton onClick={handleViewDetails} />

        {/* Content Area */}
        <ProductContent product={product} />

        {/* Card Border Glow Effect */}
        <CardGlowEffect />
      </motion.div>
    </>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
