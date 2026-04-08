"use client";

import { useCategoryStore } from "../store/useStore";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { CATEGORIES_DATA } from "../constants/constants";
// Import Icons
import { LayoutGrid, Trophy, Shirt, Watch, Layers, Wallet } from "lucide-react";

// ============================================================================
// SUB-COMPONENTS
// ============================================================================
/**
 * Category tab button component
 * @component
 */
const CategoryTabButton = React.memo(({ category, isActive, onClick }) => {
  const Icon = category.icon;

  return (
    <button
      onClick={() => onClick(category.id)}
      aria-selected={isActive}
      role="tab"
      className={`cursor-pointer
          relative flex items-center gap-3 px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 border whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-leather-900
          ${
            isActive
              ? "bg-heading text-white border-leather-900 shadow-lg"
              : "bg-white text-sub-heading border-leather-100 hover:border-leather-300 hover:text-leather-900"
          }
        `}
    >
      {/* Icon Container */}
      <span
        className={`transition-transform duration-300 ${
          isActive ? "scale-110" : "opacity-70 group-hover:opacity-100"
        }`}
        aria-hidden="true"
      >
        <Icon size={18} />
      </span>

      <span>{category.label}</span>

      {/* Active Underline/indicator for desktop */}
      {isActive && (
        <motion.div
          layoutId="activeTabIndicator"
          className="absolute -bottom-px left-0 right-0 h-0.5 bg-accent-gold"
          initial={false}
          aria-hidden="true"
        />
      )}
    </button>
  );
});

CategoryTabButton.displayName = "CategoryTabButton";

/**
 * Category tabs container
 * @component
 */
const CategoryTabsList = React.memo(
  ({ categories, activeCategory, onCategoryChange }) => (
    <div
      role="tablist"
      className="cursor-pointer flex flex-wrap md:flex-wrap justify-start md:justify-center gap-3 overflow-x-auto no-scrollbar pb-4 md:pb-0"
      aria-label="Product categories"
    >
      {categories.map((cat) => (
        <CategoryTabButton
          key={cat.id}
          category={cat}
          isActive={activeCategory === cat.id}
          onClick={onCategoryChange}
        />
      ))}
    </div>
  ),
);

CategoryTabsList.displayName = "CategoryTabsList";

// ============================================================================
// MAIN COMPONENT
// ============================================================================
/**
 * Category tabs navigation component
 * Allows users to select different product categories
 *
 * @component
 * @returns {React.ReactElement} Rendered category tabs
 */
export default function CategoryTabs() {
  const { activeCategory, setActiveCategory, setSelectedSubCategory } =
    useCategoryStore();
  const router = useRouter();
  const params = useParams();

  // Sync URL category with store
  useEffect(() => {
    const rawCategory = params?.category;
    const categoryFromUrl = Array.isArray(rawCategory)
      ? rawCategory[0]
      : rawCategory || "all";
    if (categoryFromUrl !== activeCategory) {
      setActiveCategory(categoryFromUrl);
    }
  }, [params?.category, activeCategory, setActiveCategory]);

  // Handle category change
  const handleCategoryChange = useCallback(
    (categoryId) => {
      setSelectedSubCategory("all");
      setActiveCategory(categoryId);
      router.push(
        categoryId === "all" ? "/products" : `/products/${categoryId}`,
      );
    },
    [setActiveCategory, setSelectedSubCategory, router],
  );

  // Memoized categories list
  const categoriesList = useMemo(() => CATEGORIES_DATA, []);

  return (
    <section
      className="relative container mx-auto px-4 py-6"
      aria-label="Product categories navigation"
    >
      <CategoryTabsList
        categories={categoriesList}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
    </section>
  );
}
