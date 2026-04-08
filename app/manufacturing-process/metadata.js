/**
 * metadata.js
 * Next.js App Router metadata for /manufacturing-process
 *
 * Place this file in the same route segment folder as page.jsx.
 * Next.js automatically picks up the `metadata` export and injects:
 *   - <title>, <meta name="description">, <meta name="keywords">
 *   - <meta name="robots">
 *   - <link rel="canonical">
 *   - Open Graph tags
 *   - Twitter Card tags
 *
 * For the Pages Router, see the next/head block at the bottom of this file.
 */

const BASE_URL = "https://firmleather.com";
const PAGE_URL = `${BASE_URL}/manufacturing-process`;

// ─── App Router export ────────────────────────────────────────────────────────

export const metadata = {
  // ── Core ──────────────────────────────────────────────────────────────────
  title: "Leather Manufacturing Process | Firm Leather",
  description:
    "Discover Firm Leather's meticulous premium leather manufacturing process — where centuries-old artisanal techniques meet modern precision engineering to deliver superior leather goods for global brands.",
  keywords: [
    "leather manufacturing process",
    "premium leather production",
    "artisanal leather crafting",
    "leather factory stages",
    "leather goods manufacturing",
    "quality leather production",
    "leather tanning process",
    "Firm Leather",
  ],

  // ── Canonical & robots ────────────────────────────────────────────────────
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Firm Leather",
    title: "Leather Manufacturing Process | Firm Leather",
    description:
      "Explore our premium leather manufacturing stages — artisanal craftsmanship with precision engineering for global brands.",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/images/og-manufacturing-process.jpg`,
        width: 1200,
        height: 630,
        alt: "Firm Leather manufacturing process — premium craftsmanship",
        type: "image/jpeg",
      },
    ],
  },

  // ── Twitter Card ──────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@firmleather",
    creator: "@firmleather",
    title: "Leather Manufacturing Process | Firm Leather",
    description:
      "Explore our premium leather manufacturing stages — artisanal craftsmanship with precision engineering for global brands.",
    images: [`${BASE_URL}/images/twitter-manufacturing-process.jpg`],
  },

  // ── Author / publisher ────────────────────────────────────────────────────
  authors: [{ name: "Firm Leather", url: BASE_URL }],
  publisher: "Firm Leather",
  category: "Manufacturing",

  // ── Verification (add your own tokens) ───────────────────────────────────
  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN",
    // bing: "YOUR_BING_WEBMASTER_TOKEN",
  },
};

// ─── Pages Router alternative (next/head) ────────────────────────────────────
// If you are using the Pages Router instead of the App Router, delete the
// `export const metadata` block above and use this inside your component:
//
// import Head from "next/head";
//
// function SeoHead() {
//   return (
//     <Head>
//       <title>Leather Manufacturing Process | Firm Leather</title>
//       <meta name="description" content="Discover Firm Leather's meticulous premium leather manufacturing process..." />
//       <meta name="keywords" content="leather manufacturing process, premium leather production, artisanal leather crafting, ..." />
//       <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
//       <link rel="canonical" href="https://firmleather.com/manufacturing-process" />
//
//       {/* Open Graph */}
//       <meta property="og:type" content="website" />
//       <meta property="og:url" content="https://firmleather.com/manufacturing-process" />
//       <meta property="og:site_name" content="Firm Leather" />
//       <meta property="og:title" content="Leather Manufacturing Process | Firm Leather" />
//       <meta property="og:description" content="Explore our premium leather manufacturing stages..." />
//       <meta property="og:image" content="https://firmleather.com/images/og-manufacturing-process.jpg" />
//       <meta property="og:image:width" content="1200" />
//       <meta property="og:image:height" content="630" />
//       <meta property="og:image:alt" content="Firm Leather manufacturing process" />
//       <meta property="og:locale" content="en_US" />
//
//       {/* Twitter Card */}
//       <meta name="twitter:card" content="summary_large_image" />
//       <meta name="twitter:site" content="@firmleather" />
//       <meta name="twitter:creator" content="@firmleather" />
//       <meta name="twitter:title" content="Leather Manufacturing Process | Firm Leather" />
//       <meta name="twitter:description" content="Explore our premium leather manufacturing stages..." />
//       <meta name="twitter:image" content="https://firmleather.com/images/twitter-manufacturing-process.jpg" />
//     </Head>
//   );
// }
