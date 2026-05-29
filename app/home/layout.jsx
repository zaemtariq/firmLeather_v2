export const metadata = {
  metadataBase: new URL("https://firmleather.com"),
  title: {
    default: "FirmLeather | Premium Leather Manufacturer & Exporter",
    template: "%s | FirmLeather",
  },
  description:
    "FirmLeather is a premium leather manufacturer and exporter offering finished leather, leather apparel, accessories, sports leather gear, private label production, and wholesale leather goods.",
  keywords: [
    "FirmLeather",
    "leather manufacturer",
    "premium leather products",
    "finished leather",
    "leather apparel",
    "leather accessories",
    "sports leather",
    "private label leather manufacturing",
    "wholesale leather supplier",
    "leather jackets",
    "cowboy chaps",
    "leather belts",
    "leather wallets",
    "RFID-blocking wallets",
    "golf gloves",
    "baseball batting gloves",
  ],
  applicationName: "FirmLeather",
  authors: [{ name: "FirmLeather" }],
  creator: "FirmLeather",
  publisher: "FirmLeather",
  icons: {
    icon: "/site-logo/favicon.svg",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FirmLeather | Premium Leather Manufacturer & Exporter",
    description:
      "Premium leather manufacturing, finished leather, apparel, accessories, sports leather gear, and private label production for global buyers.",
    url: "/",
    siteName: "FirmLeather",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/siteImages/factoryIMages/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "FirmLeather premium leather manufacturing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FirmLeather | Premium Leather Manufacturer & Exporter",
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
