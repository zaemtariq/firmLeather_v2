import React from "react";

// ============================================================================
// CONFIGURATION CONSTANTS
// ============================================================================
/**
 * SVG color values used in the logo
 * @type {Object}
 */
const LOGO_COLORS = {
  ACCENT: "#2DD4BF", // Teal accent bar
  PRIMARY: "currentColor", // Adapts to text color for flexibility
};

/**
 * SVG path data for logo shapes
 * @type {Object}
 */
const LOGO_PATHS = {
  ACCENT_BAR: "M30 25 L85 52 L78 64 L22 37 Z",
  MAIN_SHAPE_1: "M20 50 L55 68 L40 100 L28 94 L40 68 L15 55 Z",
  MAIN_SHAPE_2: "M58 70 L95 88 L88 100 L50 82 Z",
};

/**
 * SVG viewBox dimensions
 * @type {string}
 */
const SVG_VIEWBOX = "0 0 120 120";

// ============================================================================
// MAIN COMPONENT
// ============================================================================
/**
 * FirmLeather logo SVG component
 * Scalable vector logo that adapts to text color using currentColor
 *
 * @component
 * @param {Object} props
 * @param {string} [props.className] - Tailwind or CSS classes to apply to the SVG
 * @returns {React.ReactElement} Rendered SVG logo
 *
 * @example
 * // Basic usage with Tailwind
 * <Logo className="w-8 h-8 text-leather-900" />
 *
 * // Custom sizing
 * <Logo className="w-12 h-12" />
 */
const Logo = React.memo(({ className }) => (
  <svg
    viewBox={SVG_VIEWBOX}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="FirmLeather Logo"
    role="img"
  >
    <title>FirmLeather - Premium Leather Goods</title>

    {/* Teal Accent Bar - decorative element */}
    <path
      d={LOGO_PATHS.ACCENT_BAR}
      fill={LOGO_COLORS.ACCENT}
      aria-hidden="true"
    />

    {/* Main Structural Shapes - primary logo elements */}
    <path d={LOGO_PATHS.MAIN_SHAPE_1} fill={LOGO_COLORS.PRIMARY} />
    <path d={LOGO_PATHS.MAIN_SHAPE_2} fill={LOGO_COLORS.PRIMARY} />
  </svg>
));

Logo.displayName = "Logo";

export default Logo;
