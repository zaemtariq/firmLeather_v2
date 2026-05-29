import { create } from "zustand";

// Import product data files
import accessoriesData from "../ProductsData/accessories/accessories";
import apparelData from "../ProductsData/apparel/apparel";
import finishedLeatherData from "../ProductsData/finished_leather/finished_leather";
import petAccessoriesData from "../ProductsData/pet-accessories/accessories";
import sportsGearData from "../ProductsData/sports_gear/sports_gear";

// ============================================================================
// CONFIGURATION CONSTANTS
// ============================================================================
/**
 * Product categories configuration
 * Maps category identifiers to their data
 * @type {Object}
 */
const PRODUCT_CATEGORIES = {
  accessories: accessoriesData,
  apparel: apparelData,
  "finished-leather": finishedLeatherData,
  "pet-accessories": petAccessoriesData,
  sports: sportsGearData,
};

/**
 * All category keys for easy reference
 * @type {Array<string>}
 */
const CATEGORY_KEYS = Object.keys(PRODUCT_CATEGORIES);

/**
 * Default values for store state
 * @type {Object}
 */
const DEFAULT_STATE = {
  activeCategory: "all",
  selectedSubCategory: "all",
};

// ============================================================================
// STORE DEFINITION
// ============================================================================
/**
 * Category and product management store using Zustand
 * Manages active category, subcategory selection, and product retrieval
 *
 * @store
 * @returns {Object} Store with state and actions
 *
 * State:
 * - activeCategory {string} - Currently selected product category
 * - selectedSubCategory {string} - Currently selected product subcategory
 * - products {Object} - Product data organized by category
 *
 * Actions:
 * - setActiveCategory(category) - Update the active category
 * - setSelectedSubCategory(subcategory) - Update the selected subcategory
 * - getProductsByCategory(category) - Get all products in a category
 * - getProductById(category, id) - Get a single product by ID and category
 *
 * @example
 * const { activeCategory, setActiveCategory } = useCategoryStore();
 * setActiveCategory("accessories");
 */
export const useCategoryStore = create((set, get) => ({
  // ========================================================================
  // STATE
  // ========================================================================
  activeCategory: DEFAULT_STATE.activeCategory,
  selectedSubCategory: DEFAULT_STATE.selectedSubCategory,

  products: PRODUCT_CATEGORIES,

  // ========================================================================
  // ACTIONS
  // ========================================================================
  /**
   * Set the active category
   * @param {string} newCategory - Category identifier to activate
   */
  setActiveCategory: (newCategory) => {
    set({ activeCategory: newCategory });
  },

  /**
   * Set the selected subcategory
   * @param {string} newSubCat - Subcategory identifier to select
   */
  setSelectedSubCategory: (newSubCat) => {
    set({ selectedSubCategory: newSubCat });
  },

  /**
   * Get all products for a given category
   * If category is "all", returns products from all categories combined
   *
   * @param {string} category - Category identifier or "all"
   * @returns {Array<Object>} Array of product objects
   */
  getProductsByCategory: (category) => {
    const allProducts = get().products;

    if (category === "all") {
      return CATEGORY_KEYS.reduce(
        (acc, key) => [...acc, ...(allProducts[key] || [])],
        [],
      );
    }

    return allProducts[category] || [];
  },

  /**
   * Get a single product by ID within a specific category
   * Useful for detailed product pages
   *
   * @param {string} category - Category identifier
   * @param {string|number} id - Product identifier
   * @returns {Object|undefined} Product object if found, undefined otherwise
   */
  getProductById: (category, id) => {
    const categoryProducts = get().getProductsByCategory(category);
    return categoryProducts.find((p) => p.id === id);
  },
}));
