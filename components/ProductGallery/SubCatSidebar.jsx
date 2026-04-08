"use client";
import React, { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCategoryStore } from "../store/useStore";

// ============================================================================
// CONFIGURATION CONSTANTS
// ============================================================================
/**
 * Animation configuration for sidebar
 * @type {Object}
 */
const SIDEBAR_ANIMATION = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
};

/**
 * Button labels and text
 * @type {Object}
 */
const LABELS = {
  ALL_ITEMS: "All Items",
  RESET: "Reset",
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================
/**
 * Sidebar header component
 * @component
 */
const SidebarHeader = React.memo(({ label, showReset, onReset }) => (
  <div className="flex justify-between flex-wrap items-center mb-4 md:mb-6 px-1">
    <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-heading">
      {label}
    </h3>

    {showReset && (
      <button
        onClick={onReset}
        aria-label="Reset all filters"
        className="text-[10px] text-red-600 hover:text-red-800 font-bold uppercase tracking-tighter transition-colors focus:outline-none focus:ring-1 focus:ring-red-600"
      >
        {LABELS.RESET}
      </button>
    )}
  </div>
));

SidebarHeader.displayName = "SidebarHeader";

/**
 * Subcategory list item component
 * @component
 */
const SubCategoryItem = React.memo(
  ({ subCat, isActive, isMobile, onSelect }) => (
    <li
      role="option"
      aria-selected={isActive}
      onClick={() => onSelect(subCat)}
      className={`
        flex items-center justify-between cursor-pointer transition-all shrink-0
        whitespace-nowrap px-4 py-2 rounded-full border text-xs font-medium focus:outline-none focus:ring-1 focus:ring-offset-1
        md:rounded-none md:border-0 md:border-l-2 md:px-3 md:py-2.5 md:text-sm
        ${
          isActive
            ? "bg-leather-900 text-white border-leather-900 md:bg-leather-50 md:text-leather-900 md:border-leather-900 md:font-bold"
            : "bg-white text-sub-heading border-leather-200 md:bg-transparent md:border-transparent md:hover:border-leather-200 md:hover:bg-gray-50"
        }
      `}
    >
      <span className="capitalize">{subCat.replace("-", " ")}</span>

      <span
        className={`hidden md:block text-xs transition-opacity ${
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
        aria-hidden="true"
      >
        {isActive ? "●" : "→"}
      </span>
    </li>
  ),
);

SubCategoryItem.displayName = "SubCategoryItem";

/**
 * Subcategories list component
 * @component
 */
const SubCategoriesList = React.memo(
  ({ subCategories, selectedSubCategory, onSubCategoryClick, onReset }) => (
    <ul
      role="listbox"
      className="flex flex-row flex-wrap md:flex-col gap-2 md:gap-1 overflow-x-auto md:overflow-visible pb-4 md:pb-0 no-scrollbar"
      aria-label="Product subcategories"
    >
      {/* Mobile All Items Button */}
      <li
        role="option"
        aria-selected={selectedSubCategory === "all"}
        onClick={onReset}
        className={`md:hidden flex-wrap px-4 py-2 rounded-full border text-xs font-medium transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-offset-1 ${
          selectedSubCategory === "all"
            ? "bg-leather-900 text-white border-leather-900"
            : "bg-white text-sub-heading border-leather-200"
        }`}
      >
        {LABELS.ALL_ITEMS}
      </li>

      {subCategories.map((subCat) => (
        <SubCategoryItem
          key={subCat}
          subCat={subCat}
          isActive={selectedSubCategory === subCat}
          onSelect={onSubCategoryClick}
        />
      ))}
    </ul>
  ),
);

SubCategoriesList.displayName = "SubCategoriesList";

/**
 * Sidebar content wrapper
 * @component
 */
const SidebarContent = React.memo(
  ({
    activeData,
    selectedSubCategory,
    onSubCategoryClick,
    onReset,
    subCategories,
  }) => (
    <div className="md:sticky md:top-24 md:pr-8">
      <SidebarHeader
        label={activeData.label}
        showReset={selectedSubCategory !== "all"}
        onReset={onReset}
      />

      <SubCategoriesList
        subCategories={subCategories}
        selectedSubCategory={selectedSubCategory}
        onSubCategoryClick={onSubCategoryClick}
        onReset={onReset}
      />
    </div>
  ),
);

SidebarContent.displayName = "SidebarContent";

// ============================================================================
// MAIN COMPONENT
// ============================================================================
/**
 * Subcategory sidebar navigation component
 * Displays subcategories for filtering products within a category
 *
 * @component
 * @param {Object} props
 * @param {Object} props.activeData - Active category data with sub_cat array
 * @returns {React.ReactElement|null} Rendered sidebar or null if no subcategories
 */
export default function SubCatSidebar({ activeData }) {
  const router = useRouter();
  const { selectedSubCategory, setSelectedSubCategory } = useCategoryStore();

  // Early return if no subcategories
  if (!activeData || !activeData.sub_cat || activeData.sub_cat.length === 0) {
    return null;
  }

  // Handle subcategory selection
  const handleSubCategoryClick = useCallback(
    (sub) => {
      setSelectedSubCategory(sub);
      router.push(`/products/${activeData.id}/${sub}`);
    },
    [activeData.id, setSelectedSubCategory, router],
  );

  // Handle reset
  const handleReset = useCallback(() => {
    setSelectedSubCategory("all");
    router.push(`/products/${activeData.slug}`);
  }, [activeData.slug, setSelectedSubCategory, router]);

  // Memoized subcategories list
  const subCategories = useMemo(() => activeData.sub_cat, [activeData.sub_cat]);

  return (
    <motion.aside
      {...SIDEBAR_ANIMATION}
      className="w-full md:w-44"
      role="navigation"
      aria-label="Product subcategories"
    >
      <SidebarContent
        activeData={activeData}
        selectedSubCategory={selectedSubCategory}
        onSubCategoryClick={handleSubCategoryClick}
        onReset={handleReset}
        subCategories={subCategories}
      />
    </motion.aside>
  );
}
