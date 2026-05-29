import React from "react";
import Style from "./TermofServiceOverview.module.css";

export const metadata = {
  title: "Terms of Service - FirmLeather",
  description:
    "Review the Terms of Service for FirmLeather. Understand our guidelines, user responsibilities, product descriptions, and legal compliance.",
  keywords:
    "Terms of Service, FirmLeather Terms, User Agreement, Legal Policy, Product Accuracy, Service Terms, Leather Goods Compliance, Governing Law",
};

const TOS_SECTIONS = [
  {
    id: "overview",
    title: "Terms of Service Overview",
    content:
      "Welcome to FirmLeather! By using our website, you agree to these Terms of Service. Throughout these terms, “we”, “us”, and “our” refer to FirmLeather. Your use of our website constitutes acceptance of these terms, including any additional policies referenced herein. These terms apply to all users of the site, whether browsing, purchasing, or contributing content.",
  },
  {
    id: "accuracy",
    title: "Accuracy and Completeness",
    content:
      "While we strive to provide accurate information, we cannot guarantee the completeness or timeliness of all content. The material provided is for general information only. We reserve the right to modify site content at any time without obligation to update it.",
  },
  {
    id: "products",
    title: "Products and Services",
    content:
      "We make every effort to accurately display product colors and images. However, monitor displays may vary. We reserve the right to limit sales to specific regions and to change product descriptions or prices without notice.",
  },
  {
    id: "privacy",
    title: "Personal Information",
    content:
      "Your submission of personal information through our site is strictly governed by our Privacy Policy.",
    link: { text: "View Privacy Policy", href: "/policies/privacy-policy" },
  },
  {
    id: "errors",
    title: "Errors and Omissions",
    content:
      "Occasionally, there may be inaccuracies on our site. We reserve the right to correct any errors and to change or cancel orders if information is inaccurate, without prior notice.",
  },
  {
    id: "prohibited",
    title: "Prohibited Uses",
    content:
      "Users are prohibited from using our site for unlawful purposes, infringing on intellectual property, or interfering with the security features of the service. Violation may result in termination of access.",
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content:
      "These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of the jurisdiction in which FirmLeather operates.",
  },
];

const TOS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service - FirmLeather",
  description:
    "The legal terms and conditions for using the FirmLeather website and services.",
  publisher: {
    "@type": "Organization",
    name: "FirmLeather",
  },
};

const TosSection = ({ id, title, content, link }) => (
  <section id={id} className="mb-12 group">
    <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center">
      <span className="w-8 h-[2px] bg-sub-heading mr-4 transition-all group-hover:w-12"></span>
      {title}
    </h2>
    <div className="pl-12">
      <p className="text-stone-400 leading-relaxed text-base md:text-lg">
        {content}
      </p>
      {link && (
        <a
          href={link.href}
          className="inline-block mt-4 text-sub-heading hover:text-white underline underline-offset-4 transition-colors"
        >
          {link.text}
        </a>
      )}
    </div>
  </section>
);

export default function TermsofServiceOverview() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TOS_SCHEMA) }}
      />

      <div className="bg-stone-900 min-h-screen text-stone-200">
        {/* Hero Header Section */}
        <header className="relative py-20 bg-stone-950 border-b border-stone-800">
          <div className="container mx-auto px-6">
            <p className="text-sub-heading uppercase tracking-widest text-sm font-semibold mb-2">
              Legal Compliance
            </p>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">
              Terms of Service
            </h1>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar - Quick Navigation */}
            <aside className="lg:w-1/4 hidden lg:block">
              <nav className="sticky top-10">
                <ul className="space-y-4 border-l border-stone-800 pl-6">
                  {TOS_SECTIONS.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-sm text-stone-500 hover:text-sub-heading transition-colors"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Content body */}
            <main className="lg:w-3/4 max-w-3xl">
              <p className="italic text-stone-500 mb-12">
                Last Updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>

              {TOS_SECTIONS.map((section) => (
                <TosSection key={section.id} {...section} />
              ))}

              <footer className="mt-16 pt-8 border-t border-stone-800">
                <p className="text-stone-500 text-sm">
                  If you have questions regarding these terms, please contact
                  our legal team at
                  <a
                    href="mailto:legal@firmleather.com"
                    className="text-sub-heading ml-1"
                  >
                    legal@firmleather.com
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
