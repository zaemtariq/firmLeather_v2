import React, { useMemo } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

// ============================================================================
// CONFIGURATION CONSTANTS
// ============================================================================
/**
 * Contact information categories
 * @type {Object}
 */
const CONTACT_LOCATIONS = {
  FACTORY: "Factory",
  OUTLET: "Factory Outlet",
};

/**
 * Address information
 * @type {Object}
 */
const ADDRESS_INFO = {
  street: "Shah Faisal Plaza, Block B North Nazimabad Town",
  city: "Karachi",
  postalCode: "74600",
  country: "Pakistan",
  formatted:
    "Shah Faisal Plaza, Block B North Nazimabad Town\nKarachi, 74600, Pakistan",
};

/**
 * Phone contact information
 * @type {Object}
 */
const PHONE_INFO = {
  main: "+1 (503) 555-0123",
  availability: "Mon-Fri, 9am - 5pm PST",
};

/**
 * Email contact information
 * @type {Object}
 */
const EMAIL_INFO = {
  primary: "hello@firmleather.com",
  support: "support@firmleather.com",
};

/**
 * Response time information
 * @type {Object}
 */
const RESPONSE_TIME_INFO = {
  general: "General Inquiries: 24h",
  custom: "Custom Orders: 48h",
};

/**
 * Icon mapping for contact types
 * @type {Object}
 */
const ICON_MAP = {
  location: MapPin,
  phone: Phone,
  email: Mail,
  clock: Clock,
};

/**
 * Contact information items configuration
 * @type {Array}
 */
const CONTACT_ITEMS = [
  {
    id: "location",
    icon: "location",
    title: CONTACT_LOCATIONS.FACTORY,
    content: [ADDRESS_INFO.formatted, ADDRESS_INFO.formatted],
    type: "address",
  },
  {
    id: "phone",
    icon: "phone",
    title: "Phone",
    content: [PHONE_INFO.main, PHONE_INFO.availability],
    type: "telephone",
  },
  {
    id: "email",
    icon: "email",
    title: "Email",
    content: [EMAIL_INFO.primary, EMAIL_INFO.support],
    type: "email",
  },
  {
    id: "response",
    icon: "clock",
    title: "Response",
    content: [RESPONSE_TIME_INFO.general, RESPONSE_TIME_INFO.custom],
    type: "availability",
  },
];

/**
 * Organization contact schema for SEO
 * @type {Object}
 */
const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FirmLeather",
  url: "https://firmleather.com",
  telephone: PHONE_INFO.main,
  email: EMAIL_INFO.primary,
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS_INFO.street,
    addressLocality: ADDRESS_INFO.city,
    postalCode: ADDRESS_INFO.postalCode,
    addressCountry: ADDRESS_INFO.country,
  },
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================
/**
 * Icon circle wrapper component
 * @component
 */
const InfoIcon = React.memo(({ Icon }) => (
  <div className="shrink-0 mr-4 mt-1">
    <div
      className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-light group-hover:bg-primary-hover group-hover:text-white transition-colors duration-300"
      aria-hidden="true"
    >
      <Icon className="w-5 h-5" />
    </div>
  </div>
));

InfoIcon.displayName = "InfoIcon";

/**
 * Contact information card component
 * @component
 * @param {Object} props
 * @param {string} props.id - Unique identifier
 * @param {React.Component} props.Icon - Icon component to display
 * @param {string} props.title - Card title
 * @param {Array<string>} props.content - Content lines to display
 * @param {string} props.type - Type of contact (address, telephone, email, availability)
 * @returns {React.ReactElement}
 */
const InfoCard = React.memo(({ id, Icon, title, content, type }) => {
  // Determine if this is a double-column layout (location card)
  const isDoubleLayout = id === "location" && content.length === 2;

  return (
    <div className="flex items-start group">
      <InfoIcon Icon={Icon} />

      {isDoubleLayout ? (
        <>
          <address className="p-1 not-italic">
            <h3 className="font-serif text-lg font-bold text-leather-900">
              {title}
            </h3>
            <p className="text-primary font-sans text-sm leading-relaxed mt-1">
              {content[0].split("\n").map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx === 0 && <br />}
                </React.Fragment>
              ))}
            </p>
          </address>

          <div className="border-l-4 p-1">
            <h3 className="font-serif text-lg font-bold text-leather-900">
              {CONTACT_LOCATIONS.OUTLET}
            </h3>
            <p className="text-primary font-sans text-sm leading-relaxed mt-1">
              {content[1].split("\n").map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx === 0 && <br />}
                </React.Fragment>
              ))}
            </p>
          </div>
        </>
      ) : (
        <div>
          <h3 className="font-serif text-lg font-bold text-leather-900">
            {title}
          </h3>
          <div className="text-leather-600 font-sans text-sm leading-relaxed mt-1">
            {id === "phone" || id === "response"
              ? content.map((line, idx) => (
                  <React.Fragment key={idx}>
                    {idx === 1 && id === "phone" ? (
                      <span
                        className="text-leather-400 text-xs block"
                        aria-label="Business hours"
                      >
                        {line}
                      </span>
                    ) : (
                      <>
                        {line}
                        {idx < content.length - 1 && <br />}
                      </>
                    )}
                  </React.Fragment>
                ))
              : content.map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    {idx < content.length - 1 && <br />}
                  </React.Fragment>
                ))}
          </div>
        </div>
      )}
    </div>
  );
});

InfoCard.displayName = "InfoCard";

/**
 * Contact information list container
 * @component
 */
const InfoList = React.memo(({ items }) => (
  <div className="space-y-8">
    {items.map((item) => {
      const Icon = ICON_MAP[item.icon];
      return (
        <InfoCard
          key={item.id}
          id={item.id}
          Icon={Icon}
          title={item.title}
          content={item.content}
          type={item.type}
        />
      );
    })}
  </div>
));

InfoList.displayName = "InfoList";

// ============================================================================
// MAIN COMPONENT
// ============================================================================
/**
 * Contact information section component
 * Displays contact details including location, phone, email, and response times
 * Includes organizational schema markup for SEO
 *
 * @component
 * @returns {React.ReactElement} Rendered contact information section
 * @example
 * // Basic usage
 * <InfoSection />
 */
export const InfoSection = () => {
  // Memoized schema object
  const organizationSchema = useMemo(() => ORGANIZATION_SCHEMA, []);

  // Memoized contact items
  const contactItems = useMemo(() => CONTACT_ITEMS, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <section
        className="mt-12"
        aria-label="Contact Information"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <meta itemProp="name" content="FirmLeather" />
        <meta itemProp="telephone" content={PHONE_INFO.main} />
        <meta itemProp="email" content={EMAIL_INFO.primary} />

        <InfoList items={contactItems} />
      </section>
    </>
  );
};
