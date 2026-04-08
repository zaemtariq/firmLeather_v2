import React, { useMemo } from "react";
import Link from "next/link";
import { Page } from "@/components/constants/constants";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
} from "lucide-react";

// Footer content configuration
const COLLECTIONS = [
  { id: "Finished Leather", url: "/products/finished-leather" },
  { id: "Heritage Apparel", url: "/products/apparel" },
  { id: "Refined Accessories", url: "/products/accessories" },
  { id: "Performance Sports", url: "/products/sports" },
];

const COMPANY_LINKS = [
  { id: "Why Choose Us?", url: "/about#whychooseus" },
  { id: "Factory tour", url: "/factory-tour" },
  { id: "Export Services", url: "/about#globalreach" },
  { id: "Manufacturing Models", url: "/about#manufacturingmodels" },
  { id: "FAQs", url: "/contact#faqSection" },
];

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/firmleather/",
    icon: Facebook,
    ariaLabel: "Visit FirmLeather on Facebook",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/firm.leather/",
    icon: Instagram,
    ariaLabel: "Visit FirmLeather on Instagram",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/firmleather/",
    icon: Linkedin,
    ariaLabel: "Visit FirmLeather on LinkedIn",
  },
  {
    name: "Twitter",
    url: "#",
    icon: Twitter,
    ariaLabel: "Visit FirmLeather on Twitter",
  },
];

const CONTACT_INFO = {
  address: {
    street: "Shah Faisal Plaza, Block B North Nazimabad Town",
    city: "Karachi",
    postal: "74600",
    country: "Pakistan",
  },
  phone: "+92 334 3000580",
  phoneFormatted: "+92-334-3000580",
  email: "exports@firmleather.com",
};

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FirmLeather",
  url: "https://www.firmleather.com",
  logo: "https://www.firmleather.com/logo.png",
  description:
    "Est. 2017. We craft premium leather goods that combine traditional artistry with modern functionality. Exporting quality worldwide.",
  foundingDate: "2017",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: CONTACT_INFO.phoneFormatted,
    contactType: "customer service",
    email: CONTACT_INFO.email,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT_INFO.address.street,
    addressLocality: CONTACT_INFO.address.city,
    postalCode: CONTACT_INFO.address.postal,
    addressCountry: "PK",
  },
  sameAs: [
    "https://www.facebook.com/firmleather/",
    "https://www.instagram.com/firm.leather/",
    "https://www.linkedin.com/company/firmleather/",
  ],
};

export const Footer = () => {
  // Memoize data to prevent unnecessary re-renders
  const collections = useMemo(() => COLLECTIONS, []);
  const companyLinks = useMemo(() => COMPANY_LINKS, []);
  const socialLinks = useMemo(() => SOCIAL_LINKS, []);
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer
      className="bg-leather-primary text-white pt-20 pb-10 border-t border-leather-800"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <section>
            <h2 className="text-2xl font-serif font-bold tracking-tighter mb-6">
              FIRMLEATHER<span className="text-accent-gold">.</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Est. 2017. We craft premium leather goods that combine traditional
              artistry with modern functionality. Exporting quality worldwide.
            </p>
            <div className="flex space-x-4" role="list">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary-hover transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    aria-label={social.ariaLabel}
                    target={social.url !== "#" ? "_blank" : undefined}
                    rel={social.url !== "#" ? "noopener noreferrer" : undefined}
                    role="listitem"
                  >
                    <IconComponent size={18} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </section>

          {/* Collections Section */}
          <section>
            <h3 className="text-lg font-serif font-bold mb-6">Collections</h3>
            <ul className="space-y-4">
              {collections.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.url}
                    className="text-gray-400 hover:text-accent-gold transition-colors text-sm focus:outline-none focus:underline"
                  >
                    {item.id}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Company Section */}
          <section>
            <h3 className="text-lg font-serif font-bold mb-6">Company</h3>
            <ul className="space-y-4">
              {companyLinks.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.url}
                    className="text-gray-400 hover:text-accent-gold transition-colors text-sm focus:outline-none focus:underline"
                  >
                    {item.id}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Contact Section */}
          <section>
            <h3 className="text-lg font-serif font-bold mb-6">Contact Us</h3>
            <address className="space-y-6 not-italic">
              <div className="flex items-start">
                <MapPin
                  className="w-5 h-5 text-accent-gold mt-1 mr-3 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-gray-400 text-sm">
                  {CONTACT_INFO.address.street},
                  <br />
                  {CONTACT_INFO.address.city}, {CONTACT_INFO.address.postal},{" "}
                  {CONTACT_INFO.address.country}
                </span>
              </div>
              <div className="flex items-center">
                <Phone
                  className="w-5 h-5 text-accent-gold mr-3 flex-shrink-0"
                  aria-hidden="true"
                />
                <a
                  href={`tel:${CONTACT_INFO.phoneFormatted}`}
                  className="text-gray-400 text-sm hover:text-accent-gold transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center">
                <Mail
                  className="w-5 h-5 text-accent-gold mr-3 flex-shrink-0"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-gray-400 text-sm hover:text-accent-gold transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </address>
          </section>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-leather-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs mb-4 md:mb-0">
            &copy; {currentYear} FirmLeather. All rights reserved.
          </p>
          <nav className="flex space-x-8" aria-label="Footer links">
            <Link
              className="text-gray-500 hover:text-white text-xs transition-colors focus:outline-none focus:underline"
              href={Page.terms_of_service}
            >
              Terms of Service
            </Link>
            <Link
              className="text-gray-500 hover:text-white text-xs transition-colors focus:outline-none focus:underline"
              href={Page.privacy_policy}
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </div>

      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ORGANIZATION_SCHEMA),
        }}
      />
    </footer>
  );
};
