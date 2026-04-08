"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import ProductCard from "./ProductCard";
import { useCategoryStore } from "../store/useStore";

// ============================================================================
// CONFIGURATION CONSTANTS & UTILITIES
// ============================================================================
/**
 * Normalize key by converting to lowercase and replacing underscores with hyphens
 * @type {Function}
 */
const normalizeKey = (value = "") => value.toLowerCase().replace(/_/g, "-");

/**
 * Skeleton loader count for initial loading state
 * @type {number}
 */
const SKELETON_COUNT = 6;

/**
 * Empty state messages
 * @type {Object}
 */
const EMPTY_STATES = {
  NO_PRODUCTS: "No products found in this collection.",
  NO_FILTERED: (category) => `No products found for ${category}.`,
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================
/**
 * Product skeleton loader component
 * @component
 */
const ProductSkeleton = React.memo(() => (
  <div
    className="animate-pulse bg-leather-100 rounded-xl h-80 w-full"
    role="status"
    aria-label="Loading product"
    aria-hidden="true"
  />
));

ProductSkeleton.displayName = "ProductSkeleton";

/**
 * Skeleton grid component
 * @component
 */
const SkeletonGrid = React.memo(() => (
  <div
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6"
    role="region"
    aria-label="Loading products"
  >
    {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
      <ProductSkeleton key={`skeleton-${i}`} />
    ))}
  </div>
));

SkeletonGrid.displayName = "SkeletonGrid";

/**
 * Empty state message component
 * @component
 */
const EmptyStateMessage = React.memo(({ message }) => (
  <div
    className="px-6 py-20 text-center text-sub-heading"
    role="status"
    aria-live="polite"
  >
    {message}
  </div>
));

EmptyStateMessage.displayName = "EmptyStateMessage";

/**
 * Products grid container
 * @component
 */
const ProductsGridContainer = React.memo(({ products, onProductClick }) => (
  <section className="pb-20" aria-label="Products grid">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
      {products.map((product) => (
        <ProductCard
          key={`product-${product.id}`}
          product={product}
          onClick={() => onProductClick(product)}
        />
      ))}
    </div>
  </section>
));

ProductsGridContainer.displayName = "ProductsGridContainer";

// ============================================================================
// MAIN COMPONENT
// ============================================================================
/**
 * Product grid display component
 * Displays filtered product cards based on category and subcategory
 *
 * @component
 * @returns {React.ReactElement} Rendered product grid
 */
export default function ProductGrid() {
  const router = useRouter();
  const { category, subcategory } = useParams();
  const { setSelectedSubCategory, getProductsByCategory } = useCategoryStore();

  const normalizedCategory = useMemo(
    () => normalizeKey(category || "all"),
    [category],
  );
  const normalizedSubCategory = useMemo(
    () => normalizeKey(subcategory || "all"),
    [subcategory],
  );

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync URL subcategory to store
  useEffect(() => {
    setSelectedSubCategory(normalizedSubCategory);
  }, [normalizedSubCategory, setSelectedSubCategory]);

  // Load products by category
  useEffect(() => {
    setLoading(true);

    try {
      const products = getProductsByCategory(normalizedCategory) || [];
      setAllProducts(products.filter((p) => p?.id && p?.category));
    } catch (error) {
      console.error("Error loading products:", error);
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  }, [normalizedCategory, getProductsByCategory]);

  // Filter by subcategory
  const filteredProducts = useMemo(() => {
    if (normalizedSubCategory === "all") return allProducts;

    return allProducts.filter(
      (product) => normalizeKey(product.subCat) === normalizedSubCategory,
    );
  }, [allProducts, normalizedSubCategory]);

  // Handle product click
  const handleProductClick = useCallback(
    (product) => {
      router.push(
        `/products/${normalizeKey(product.category)}/${normalizeKey(
          product.subCat,
        )}/${product.productCode}`,
      );
    },
    [router],
  );

  // Loading state
  if (loading) {
    return <SkeletonGrid />;
  }

  // No products in category
  if (!allProducts.length) {
    return <EmptyStateMessage message={EMPTY_STATES.NO_PRODUCTS} />;
  }

  // No products in filtered subcategory
  if (!filteredProducts.length) {
    return (
      <EmptyStateMessage
        message={`${EMPTY_STATES.NO_FILTERED(
          normalizedSubCategory.replace(/-/g, " "),
        )}`}
      />
    );
  }

  // Render products grid
  return (
    <ProductsGridContainer
      products={filteredProducts}
      onProductClick={handleProductClick}
    />
  );
}
