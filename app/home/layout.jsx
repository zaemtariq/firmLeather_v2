export const metadata = {
  metadataBase: new URL("https://firmleather.com"),
  title: {
    default: "Firm Leather | Premium Leather Manufacturer & Exporter",
    template: "%s | Firm Leather",
  },
  description:
    "Firm Leather is a premium leather manufacturer and exporter offering finished leather, leather apparel, accessories, sports leather gear, private label production, and wholesale leather goods.",
  keywords: [
    "Firm Leather",
    "leather manufacturer",
    "premium leather products",
    "finished leather",
    "leather apparel",
    "leather accessories",
    "sports leather gear",
    "private label leather manufacturing",
    "wholesale leather supplier",
  ],
  applicationName: "Firm Leather",
  authors: [{ name: "Firm Leather" }],
  creator: "Firm Leather",
  publisher: "Firm Leather",
  icons: {
    icon: "/site-logo/favicon.svg",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Firm Leather | Premium Leather Manufacturer & Exporter",
    description:
      "Premium leather manufacturing, finished leather, apparel, accessories, sports leather gear, and private label production for global buyers.",
    url: "/",
    siteName: "Firm Leather",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/siteImages/factoryIMages/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "Firm Leather premium leather manufacturing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Firm Leather | Premium Leather Manufacturer & Exporter",
    description:
      "Premium leather manufacturing, finished leather, apparel, accessories, sports leather gear, and private label production for global buyers.",
    images: ["/siteImages/factoryIMages/hero-image.jpg"],
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

export default function HomeLayout({ children }) {
  return <>{children}</>;
}
