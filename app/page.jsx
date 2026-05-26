import React from "react";
import HomePage from "./home/page";

export const metadata = {
  metadataBase: new URL("https://firmleather.com"),
  title: "Firm Leather | Premium Leather Manufacturer & Exporter",
  description:
    "Firm Leather is a premium leather manufacturer and exporter offering finished leather, leather apparel, accessories, sports leather gear, private label production, and wholesale leather goods.",
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
};

export default function Home() {
  return (
    <div>
      <HomePage />
    </div>
  );
}
