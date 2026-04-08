"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Page } from "@/components/constants/constants";
import {
  Phone,
  Menu,
  X,
  ShoppingBag,
  Info,
  Home,
  ChevronRight,
  Factory,
} from "lucide-react";

// Design system constants
const COLORS = {
  primary: "#4A3728",
  accent: "#AE592C",
  hover: "#8B4513",
  white: "#ffffff",
  lightBorder: "#F3F4F6",
};

const STYLES = {
  navLink:
    "text-sm font-medium uppercase tracking-widest hover:transition-colors",
  mobileNavLink: "block text-lg font-medium serif",
  desktopNav: "hidden md:flex space-x-10 items-center",
  mobileMenuContainer:
    "lg:hidden bg-white absolute top-full left-0 w-full border-t shadow-xl p-8 space-y-6 flex flex-col",
};

// Navigation configuration
const NAV_LINKS = [
  { name: "Home", path: Page.Home, icon: Home, ariaLabel: "Go to home page" },
  {
    name: "Products",
    path: Page.Products,
    icon: ShoppingBag,
    ariaLabel: "View our products",
  },
  {
    name: "Our Process",
    path: Page.ManufacturingProcess,
    icon: Factory,
    ariaLabel: "Learn about our manufacturing process",
  },
  {
    name: "About",
    path: Page.About,
    icon: Info,
    ariaLabel: "Learn about FirmLeather",
  },
  { name: "Contact", path: Page.Contact, icon: Phone, ariaLabel: "Contact us" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Memoize navigation links to prevent unnecessary re-renders
  const navLinks = useMemo(() => NAV_LINKS, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-6"
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
          title="FirmLeather - Premium Leather Goods"
        >
          <div className="relative w-8 h-8">
            <img
              src="/site-logo/Firmleather-logo.gif"
              alt="FirmLeather - Premium leather goods manufacturer and exporter"
              className="object-contain w-full h-full"
              loading="eager"
            />
          </div>
          <span
            className="text-2xl font-bold tracking-tighter serif"
            style={{ color: COLORS.primary }}
          >
            FIRM<span style={{ color: COLORS.accent }}>LEATHER</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className={STYLES.desktopNav}>
          {navLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={STYLES.navLink}
                style={{ color: COLORS.primary }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = COLORS.hover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = COLORS.primary)
                }
                aria-label={link.ariaLabel}
              >
                <div className="flex items-center space-x-3">
                  <IconComponent size={18} aria-hidden="true" />
                  <span>{link.name}</span>
                </div>
              </Link>
            );
          })}
          <Link
            href={Page.RequestQuote}
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
          >
            <button
              className="bg-primary text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary-hover transition-all flex items-center gap-2"
              aria-label="Request a quote from FirmLeather"
            >
              <span>Get Quote</span>
              <ChevronRight size={14} aria-hidden="true" />
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
          style={{ color: COLORS.primary }}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? (
            <X size={28} aria-hidden="true" />
          ) : (
            <Menu size={28} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div
          className={STYLES.mobileMenuContainer}
          id="mobile-menu"
          style={{ borderTopColor: COLORS.lightBorder }}
        >
          {navLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={STYLES.mobileNavLink}
                style={{ color: COLORS.primary }}
                onClick={closeMenu}
                aria-label={link.ariaLabel}
              >
                <div className="flex items-center space-x-3">
                  <IconComponent size={18} aria-hidden="true" />
                  <span>{link.name}</span>
                </div>
              </Link>
            );
          })}
          <Link href={Page.RequestQuote} onClick={closeMenu}>
            <button
              className="w-full text-white px-6 py-4 rounded-xl text-sm font-bold uppercase tracking-widest flex justify-center items-center gap-2"
              style={{ backgroundColor: COLORS.accent }}
              aria-label="Request a quote from FirmLeather"
            >
              Get Quote <ChevronRight size={14} aria-hidden="true" />
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};
