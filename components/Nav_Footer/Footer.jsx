import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";
import { Page } from "@/components/constants/constants";

const collections = [
  {
    name: "Finished Leather",
    href: "/products/finished-leather",
  },
  {
    name: "Heritage Apparel",
    href: "/products/apparel",
  },
  {
    name: "Refined Accessories",
    href: "/products/accessories",
  },
  {
    name: "Performance Sports",
    href: "/products/sports",
  },
];

const companyLinks = [
  {
    name: "Why Choose Us",
    href: "/about#why-us",
  },
  {
    name: "Factory Tour",
    href: "/factory-tour",
  },
  {
    name: "Export Services",
    href: "/about#global",
  },
  {
    name: "Manufacturing Models",
    href: "/about#models",
  },
];

const socials = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/firmleather/",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/firm.leather/",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/firmleather/",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-stone-800 bg-stone-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              FIRMLEATHER
              <span className="text-amber-500">.</span>
            </h2>

            <p className="mt-5 max-w-sm leading-7 text-stone-400">
              Premium leather manufacturer and exporter crafting timeless
              leather goods for global brands, retailers, and wholesalers since
              2017.
            </p>

            {/* Socials */}
            <div className="mt-8 flex gap-3">
              {socials.map((item, index) => {
                const Icon = item.icon;

                return (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-700 text-stone-300 transition hover:border-amber-500 hover:text-amber-500"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-lg font-semibold">Collections</h3>

            <ul className="mt-6 space-y-4">
              {collections.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-stone-400 transition hover:text-amber-500"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold">Company</h3>

            <ul className="mt-6 space-y-4">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-stone-400 transition hover:text-amber-500"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold">Contact</h3>

            <div className="mt-6 space-y-5">
              <div className="flex gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-amber-500" />
                <p className="text-stone-400">
                  Shah Faisal Plaza, Block B North Nazimabad, Karachi, Pakistan
                </p>
              </div>

              <a
                href="tel:+923343000580"
                className="flex items-center gap-3 text-stone-400 transition hover:text-amber-500"
              >
                <Phone className="h-5 w-5 text-amber-500" />
                +92 334 3000580
              </a>

              <a
                href="mailto:exports@firmleather.com"
                className="flex items-center gap-3 text-stone-400 transition hover:text-amber-500"
              >
                <Mail className="h-5 w-5 text-amber-500" />
                exports@firmleather.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-stone-800 pt-8 text-sm text-stone-500 md:flex-row">
          <p>© {new Date().getFullYear()} FirmLeather. All rights reserved.</p>

          <div className="flex gap-8">
            <Link
              href={Page.terms_of_service}
              className="transition hover:text-white"
            >
              Terms
            </Link>

            <Link
              href={Page.privacy_policy}
              className="transition hover:text-white"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
