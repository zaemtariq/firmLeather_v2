import React from "react";
import Style from "./PrivacyPolicy.module.css";

export const metadata = {
  title: "Privacy Policy - Firm Leather",
  description:
    "Read our Privacy Policy to understand how Firm Leather collects, uses, and protects your personal information. We prioritize your privacy and data security.",
  keywords:
    "Privacy Policy, Data Protection, Personal Information, Data Security, User Privacy, Information Collection, Data Usage, Data Privacy, Firm Leather Privacy Policy, Protecting Personal Data, User Data Security, Online Privacy",
};

const CONTACT_INFO = {
  email: "info@firmleather.com",
  website: "https://firmleather.com",
  siteName: "firmleather.com",
};

const PRIVACY_SECTIONS = [
  {
    id: "introduction",
    title: "Introduction",
    content: `This Privacy Policy describes how ${CONTACT_INFO.siteName} (the "Site" or "we") collects, uses, and discloses your Personal Information when you visit or make a purchase from the Site.`,
    subsections: [],
  },
  {
    id: "collecting",
    title: "Collecting Personal Information",
    content:
      "When you visit the Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support.",
    subsections: [
      {
        title: "Device information",
        items: [
          "Examples of Personal Information collected: version of web browser, IP address, time zone, cookie information, what sites or products you view, search terms, and how you interact with the Site.",
          "Purpose of collection: to load the Site accurately for you, and to perform analytics on Site usage to optimize our Site.",
          "Source of collection: Collected automatically when you access our Site using cookies, log files, web beacons, tags, or pixels.",
        ],
      },
      {
        title: "Customer support information",
        items: [
          "Examples of Personal Information collected: name, email address, and any other information you choose to share when you contact us for customer support.",
          "Purpose of collection: to provide customer support.",
          "Source of collection: collected from you.",
        ],
      },
    ],
  },
  {
    id: "minors",
    title: "Minors",
    content:
      "The Site is not intended for individuals under the age of 14. We do not intentionally collect Personal Information from children. If you are the parent or guardian and believe your child has provided us with Personal Information, please contact us at the address below to request deletion.",
    subsections: [],
  },
  {
    id: "retention",
    title: "Retention",
    content:
      "When you place an order through the Site, we will retain your Personal Information for our records unless and until you ask us to erase this information. For more information on your right of erasure, please see the 'Your rights' section below.",
    subsections: [],
  },
  {
    id: "changes",
    title: "Changes",
    content:
      "We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.",
    subsections: [],
  },
  {
    id: "contact",
    title: "Contact",
    content: `For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by email at ${CONTACT_INFO.email}.`,
    email: CONTACT_INFO.email,
    subsections: [],
  },
];

const PRIVACY_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://firmleather.com/policies/privacy-policy#webpage",
      url: "https://firmleather.com/policies/privacy-policy",
      name: "Privacy Policy - Firm Leather",
      description:
        "Our comprehensive privacy policy outlining how we collect, use, and protect your personal information.",
    },
    {
      "@type": "PrivacyPolicy",
      name: "Firm Leather Privacy Policy",
      url: "https://firmleather.com/policies/privacy-policy",
      publisher: {
        "@type": "Organization",
        name: "Firm Leather",
        url: "https://firmleather.com",
      },
    },
  ],
};

const SubsectionItem = ({ title, items }) => (
  <div className="mt-6 pl-4 border-l-2 border-stone-800">
    <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
    <ul className="list-disc ml-5 space-y-2 text-stone-400 text-sm md:text-base">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
);

const PolicySection = ({ id, title, content, subsections, email }) => {
  const renderContent = (text) => {
    if (email && text.includes(email)) {
      const parts = text.split(email);
      return (
        <>
          {parts[0]}
          <a
            href={`mailto:${email}`}
            className="text-sub-heading underline underline-offset-4"
          >
            {email}
          </a>
          {parts[1]}
        </>
      );
    }
    if (text.includes(CONTACT_INFO.siteName)) {
      const parts = text.split(CONTACT_INFO.siteName);
      return (
        <>
          {parts[0]}
          <a
            href={CONTACT_INFO.website}
            className="text-sub-heading underline underline-offset-4"
          >
            {CONTACT_INFO.siteName}
          </a>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  return (
    <section id={id} className="mb-16 group">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center">
        <span className="w-8 h-[2px] bg-sub-heading mr-4 transition-all group-hover:w-12"></span>
        {title}
      </h2>
      <div className="pl-12">
        <p className="text-stone-400 leading-relaxed text-base md:text-lg">
          {renderContent(content)}
        </p>
        {subsections?.length > 0 && (
          <div className="mt-8 space-y-8">
            {subsections.map((sub, idx) => (
              <SubsectionItem key={idx} title={sub.title} items={sub.items} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default function PrivacyPolicy() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRIVACY_SCHEMA) }}
      />

      <div className="bg-stone-900 min-h-screen text-stone-200">
        {/* Sync UI: Hero Header */}
        <header className="relative py-20 bg-stone-950 border-b border-stone-800">
          <div className="container mx-auto px-6">
            <p className="text-sub-heading uppercase tracking-widest text-sm font-semibold mb-2">
              Data Protection
            </p>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">
              Privacy Policy
            </h1>
          </div>
        </header>

        {/* Sync UI: Sidebar + Main Layout */}
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Navigation */}
            <aside className="lg:w-1/4 hidden lg:block">
              <nav className="sticky top-10">
                <ul className="space-y-4 border-l border-stone-800 pl-6">
                  {PRIVACY_SECTIONS.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-sm text-stone-500 hover:text-sub-heading transition-colors block py-1"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Main Content Area */}
            <main
              className="lg:w-3/4 max-w-3xl"
              role="main"
              aria-label="Privacy Policy content"
            >
              <p className="italic text-stone-500 mb-12">
                Last Updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>

              <article itemScope itemType="https://schema.org/PrivacyPolicy">
                {PRIVACY_SECTIONS.map((section) => (
                  <PolicySection key={section.id} {...section} />
                ))}
              </article>

              <footer className="mt-16 pt-8 border-t border-stone-800">
                <p className="text-stone-500 text-sm">
                  If you have concerns about your data, please contact our
                  privacy officer at
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-sub-heading ml-1"
                  >
                    {CONTACT_INFO.email}
                  </a>
                  .
                </p>
              </footer>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
