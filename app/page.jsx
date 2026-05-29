import React from "react";
import HomePage from "./home/page";

export const metadata = {
  metadataBase: new URL("https://firmleather.com"),
  title: "FirmLeather | Premium Leather Manufacturer & Exporter",
  description:
    "FirmLeather is a premium leather manufacturer and exporter offering finished leather, leather apparel, leather jackets, cowboy chaps, leather belts, leather wallets, RFID-blocking wallets, golf gloves, baseball batting gloves, private label production, and wholesale leather goods.",
  keywords: [
    "FirmLeather",
    "leather manufacturer",
    "premium leather products",
    "finished leather",
    "leather apparel",
    "leather jackets",
    "cowboy chaps",
    "leather accessories",
    "leather belts",
    "leather wallets",
    "RFID-blocking wallets",
    "sports leather gear",
    "golf gloves",
    "baseball batting gloves",
    "private label leather manufacturing",
    "wholesale leather supplier",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FirmLeather | Premium Leather Manufacturer & Exporter",
    description:
      "Premium leather manufacturing for finished leather, leather jackets, cowboy chaps, belts, wallets, RFID-blocking wallets, golf gloves, baseball batting gloves, and private label production.",
    url: "/",
    siteName: "FirmLeather",
    type: "website",
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
      "Premium leather manufacturing for finished leather, leather jackets, cowboy chaps, belts, wallets, RFID-blocking wallets, golf gloves, baseball batting gloves, and private label production.",
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
