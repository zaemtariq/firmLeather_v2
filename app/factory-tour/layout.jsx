export const metadata = {
  title: "Factory Tour - Firm Leather",
  description:
    "Take a virtual tour of Firm Leather's state-of-the-art manufacturing facility in Sialkot, Pakistan. See how we craft premium leather products.",
  keywords:
    "factory tour, leather manufacturing, production facility, leather factory, manufacturing process",
  icons: {
    icon: "/site-logo/favicon.svg",
  },
  alternates: {
    canonical: "https://firmleather.com/factory-tour",
  },
  openGraph: {
    title: "Factory Tour - Firm Leather",
    description:
      "Take a virtual tour of Firm Leather's state-of-the-art manufacturing facility in Sialkot, Pakistan.",
    url: "https://firmleather.com/factory-tour",
    siteName: "Firm Leather",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Factory Tour - Firm Leather",
    description:
      "Take a virtual tour of Firm Leather's state-of-the-art manufacturing facility in Sialkot, Pakistan.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FactoryTourLayout({ children }) {
  return <>{children}</>;
}
