export const metadata = {
  metadataBase: new URL("https://firmleather.com"),
  title: "Contact Firm Leather | Leather Manufacturing Inquiries",
  description:
    "Contact Firm Leather for wholesale leather products, private label leather manufacturing, finished leather, apparel, accessories, sports gear, samples, and export inquiries.",
  keywords: [
    "contact Firm Leather",
    "leather manufacturing inquiry",
    "wholesale leather contact",
    "private label leather manufacturer",
    "leather product quote",
    "finished leather supplier contact",
    "Sialkot leather manufacturer",
    "Pakistan leather exporter",
  ],
  applicationName: "Firm Leather",
  authors: [{ name: "Firm Leather" }],
  creator: "Firm Leather",
  publisher: "Firm Leather",
  icons: {
    icon: "/site-logo/favicon.svg",
  },
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Firm Leather | Leather Manufacturing Inquiries",
    description:
      "Reach Firm Leather for wholesale leather goods, private label production, samples, and export-ready manufacturing inquiries.",
    url: "/contact",
    siteName: "Firm Leather",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/siteImages/factoryIMages/partner_us.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Firm Leather for leather manufacturing inquiries",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Firm Leather | Leather Manufacturing Inquiries",
    description:
      "Contact Firm Leather for wholesale leather goods, private label production, samples, and export inquiries.",
    images: ["/siteImages/factoryIMages/partner_us.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function ContactLayout({ children }) {
  return <>{children}</>;
}
