"use client";
import React, { useMemo } from "react";

// ============================================================================
// BASE STYLES & VARIANTS
// ============================================================================
/**
 * Base button styling applied to all button variants
 * @type {string}
 */
const BASE_STYLES =
  "inline-flex items-center justify-center px-6 py-3 border text-sm font-medium tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

/**
 * Button style variants
 * @type {Object}
 */
const BUTTON_VARIANTS = {
  primary:
    "border-transparent text-white bg-leather-900 hover:bg-leather-800 focus:ring-leather-900 shadow-md",
  secondary:
    "border-transparent text-leather-900 bg-leather-200 hover:bg-leather-300 focus:ring-leather-500",
  outline:
    "border-leather-900 text-leather-900 bg-transparent hover:bg-leather-50 focus:ring-leather-900",
  ghost:
    "border-transparent text-leather-700 hover:text-leather-900 hover:bg-leather-100",
};

// ============================================================================
// COMPONENTS
// ============================================================================
/**
 * LoadingSpinner component - animated SVG spinner for loading state
 * @component
 */
const LoadingSpinner = React.memo(() => (
  <svg
    className="animate-spin -ml-1 mr-3 h-4 w-4 text-current"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    role="img"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
));

LoadingSpinner.displayName = "LoadingSpinner";

/**
 * IconWrapper component - wrapper for button icon with proper spacing
 * @component
 */
const IconWrapper = React.memo(({ icon }) => (
  <span className="mr-2" aria-hidden="true">
    {icon}
  </span>
));

IconWrapper.displayName = "IconWrapper";

/**
 * Button component - reusable, accessible button with multiple variants
 *
 * @component
 * @example
 * // Primary button
 * <Button variant="primary">Click me</Button>
 *
 * // Button with loading state
 * <Button isLoading={true}>Submitting...</Button>
 *
 * // Button with icon
 * <Button icon={<CheckIcon />}>Save</Button>
 *
 * @param {React.ReactNode} children - Button text content
 * @param {string} [variant="primary"] - Button style variant: 'primary', 'secondary', 'outline', 'ghost'
 * @param {string} [className] - Additional CSS classes to apply
 * @param {boolean} [isLoading=false] - Shows loading spinner and disables button
 * @param {React.ReactNode} [icon] - Icon to display before text
 * @param {*} props - Additional HTML button attributes
 * @returns {React.ReactElement} Button element
 */
export const Button = React.memo(
  ({
    children,
    variant = "primary",
    className = "",
    isLoading = false,
    icon,
    ...props
  }) => {
    // Memoize computed className to prevent unnecessary recalculations
    const computedClassName = useMemo(
      () =>
        `${BASE_STYLES} ${BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary} ${className}`,
      [variant, className],
    );

    // Determine if button should be disabled
    const isDisabled = useMemo(
      () => isLoading || props.disabled,
      [isLoading, props.disabled],
    );

    return (
      <button
        className={computedClassName}
        disabled={isDisabled}
        aria-busy={isLoading}
        type="button"
        {...props}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : icon ? (
          <IconWrapper icon={icon} />
        ) : null}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
