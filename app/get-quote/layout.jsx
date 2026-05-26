export const metadata = {
  metadataBase: new URL("https://firmleather.com"),
  title: {
    default: "Request a Leather Manufacturing Quote | Firm Leather",
    template: "%s | Firm Leather",
  },
  description:
    "Request a quote from Firm Leather for wholesale leather products, custom leather manufacturing, private label production, samples, bulk orders, and export inquiries.",
  keywords: [
    "leather quote",
    "leather manufacturing quote",
    "custom leather manufacturing",
    "private label leather quote",
    "wholesale leather pricing",
    "bulk leather order",
    "sample request",
    "Firm Leather quote",
  ],
  applicationName: "Firm Leather",
  authors: [{ name: "Firm Leather" }],
  creator: "Firm Leather",
  publisher: "Firm Leather",
  icons: {
    icon: "/site-logo/favicon.svg",
  },
  openGraph: {
    title: "Request a Leather Manufacturing Quote | Firm Leather",
    description:
      "Send Firm Leather your wholesale, sample, custom manufacturing, or private label leather production requirements.",
    url: "/get-quote/general",
    siteName: "Firm Leather",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/siteImages/factoryIMages/partner_us.jpg",
        width: 1200,
        height: 630,
        alt: "Request a leather manufacturing quote from Firm Leather",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Request a Leather Manufacturing Quote | Firm Leather",
    description:
      "Request wholesale, sample, custom manufacturing, or private label leather production pricing from Firm Leather.",
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

export default function GetQuoteLayout({ children }) {
  return <>{children}</>;
}
