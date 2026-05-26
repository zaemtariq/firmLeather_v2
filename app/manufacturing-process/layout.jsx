export const metadata = {
  metadataBase: new URL("https://firmleather.com"),
  title: "Leather Manufacturing Process | Firm Leather",
  description:
    "Explore Firm Leather's leather manufacturing process, from hide selection and tanning to precision cutting, stitching, quality control, finishing, and export packaging.",
  keywords: [
    "leather manufacturing process",
    "leather production",
    "leather tanning process",
    "finished leather manufacturing",
    "leather goods manufacturing",
    "leather quality control",
    "private label leather manufacturer",
    "Firm Leather",
  ],
  applicationName: "Firm Leather",
  authors: [{ name: "Firm Leather" }],
  creator: "Firm Leather",
  publisher: "Firm Leather",
  category: "Manufacturing",
  icons: {
    icon: "/site-logo/favicon.svg",
  },
  alternates: {
    canonical: "/manufacturing-process",
  },
  openGraph: {
    title: "Leather Manufacturing Process | Firm Leather",
    description:
      "See how Firm Leather manages hide selection, tanning, cutting, stitching, quality control, finishing, and export-ready leather production.",
    url: "/manufacturing-process",
    siteName: "Firm Leather",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/siteImages/factoryIMages/leather_manufacturer.jpg",
        width: 1200,
        height: 630,
        alt: "Firm Leather manufacturing process",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leather Manufacturing Process | Firm Leather",
    description:
      "Explore Firm Leather's controlled leather manufacturing process from tanning to final export packaging.",
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

export default function ManufacturingProcessLayout({ children }) {
  return <>{children}</>;
}
