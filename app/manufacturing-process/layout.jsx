export const metadata = {
  metadataBase: new URL("https://firmleather.com"),
  title: "Leather Manufacturing Process | FirmLeather",
  description:
    "Explore FirmLeather's leather manufacturing process, from hide selection and tanning to precision cutting, stitching, quality control, finishing, and export packaging.",
  keywords: [
    "leather manufacturing process",
    "leather production",
    "leather tanning process",
    "finished leather manufacturing",
    "leather goods manufacturing",
    "leather quality control",
    "private label leather manufacturer",
    "FirmLeather",
  ],
  applicationName: "FirmLeather",
  authors: [{ name: "FirmLeather" }],
  creator: "FirmLeather",
  publisher: "FirmLeather",
  category: "Manufacturing",
  icons: {
    icon: "/site-logo/favicon.svg",
  },
  alternates: {
    canonical: "/manufacturing-process",
  },
  openGraph: {
    title: "Leather Manufacturing Process | FirmLeather",
    description:
      "See how FirmLeather manages hide selection, tanning, cutting, stitching, quality control, finishing, and export-ready leather production.",
    url: "/manufacturing-process",
    siteName: "FirmLeather",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/siteImages/factoryIMages/leather_manufacturer.jpg",
        width: 1200,
        height: 630,
        alt: "FirmLeather manufacturing process",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leather Manufacturing Process | FirmLeather",
    description:
      "Explore FirmLeather's controlled leather manufacturing process from tanning to final export packaging.",
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
