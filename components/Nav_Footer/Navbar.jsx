"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  Factory,
  Home,
  Info,
  Menu,
  Phone,
  ShoppingBag,
  X,
} from "lucide-react";
import { Page } from "@/components/constants/constants";

const navigation = [
  { label: "Home", href: Page.Home, icon: Home },
  { label: "Products", href: Page.Products, icon: ShoppingBag },
  { label: "Process", href: Page.ManufacturingProcess, icon: Factory },
  { label: "About", href: Page.About, icon: Info },
  { label: "Contact", href: Page.Contact, icon: Phone },
];

const isActivePath = (pathname, href) => {
  if (href === Page.Home) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
};

export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateNavbar = () => setIsScrolled(window.scrollY > 16);

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });

    return () => window.removeEventListener("scroll", updateNavbar);
  }, []);

  const navClasses =
    isScrolled || isOpen
      ? "border-stone-200 bg-white/95 shadow-sm backdrop-blur"
      : "border-transparent bg-white/85 backdrop-blur-sm md:bg-transparent";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${navClasses}`}
    >
      <nav
        className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href={Page.Home}
          className="flex items-center gap-3 rounded-sm outline-none transition focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
          aria-label="FirmLeather home"
        >
          <Image
            src="/site-logo/Firmleather-logo.gif"
            alt=""
            width={40}
            height={40}
            unoptimized
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="font-heading12 text-2xl font-extrabold tracking-normal text-stone-950">
            Firm<span className="text-primary">Leather</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navigation.map(({ label, href, icon: Icon }) => {
            const active = isActivePath(pathname, href);

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition ${
                  active
                    ? "bg-leather-100 text-primary"
                    : "text-stone-700 hover:bg-stone-100 hover:text-primary"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+923343000580"
            className="flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 hover:text-primary"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call
          </a>
          <Link
            href={Page.RequestQuote}
            className="flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
          >
            Get Quote
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full text-stone-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-stone-200 bg-white px-5 py-5 shadow-lg lg:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-2">
            {navigation.map(({ label, href, icon: Icon }) => {
              const active = isActivePath(pathname, href);

              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-base font-semibold transition ${
                    active
                      ? "bg-leather-100 text-primary"
                      : "text-stone-800  hover:text-primary"
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {label}
                </Link>
              );
            })}

            <Link
              href={Page.RequestQuote}
              onClick={() => setIsOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-primary-hover"
            >
              Get Quote
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
