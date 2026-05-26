export const metadata = {
  metadataBase: new URL("https://firmleather.com"),
  title: "About Firm Leather | Premium Leather Manufacturer",
  description:
    "Learn about Firm Leather, a premium leather manufacturer and exporter founded in 2017, specializing in finished leather, leather goods, apparel, accessories, sports gear, and private label production.",
  keywords: [
    "about Firm Leather",
    "leather manufacturer",
    "premium leather exporter",
    "private label leather manufacturer",
    "finished leather supplier",
    "leather goods manufacturer",
    "leather factory",
    "Sialkot leather manufacturer",
  ],
  applicationName: "Firm Leather",
  authors: [{ name: "Firm Leather" }],
  creator: "Firm Leather",
  publisher: "Firm Leather",
  icons: {
    icon: "/site-logo/favicon.svg",
  },
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Firm Leather | Premium Leather Manufacturer",
    description:
      "Discover Firm Leather's manufacturing expertise, craftsmanship, export capabilities, and commitment to premium leather production.",
    url: "/about",
    siteName: "Firm Leather",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/siteImages/factoryIMages/leather_manufacturer.jpg",
        width: 1200,
        height: 630,
        alt: "Firm Leather premium leather manufacturing team and factory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Firm Leather | Premium Leather Manufacturer",
    description:
      "Learn about Firm Leather's craftsmanship, manufacturing services, global reach, and premium leather production.",
    images: ["/siteImages/factoryIMages/leather_manufacturer.jpg"],
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

export default function AboutLayout({ children }) {
  return <>{children}</>;
}
