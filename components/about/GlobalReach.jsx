"use client";
import React, { useMemo } from "react";
import { Globe2 } from "lucide-react";

// Configuration constants
const MARKETS = [
  {
    region: "Asia",
    countries: [
      "Japan",
      "Singapore",
      "South Korea",
      "Malaysia",
      "Taiwan",
      "UAE",
    ],
  },
  {
    region: "Europe",
    countries: [
      "Germany",
      "France",
      "Netherlands",
      "Spain",
      "Sweden",
      "Denmark",
      "Norway",
      "Portugal",
      "United Kingdom",
      "Ireland",
    ],
  },
  {
    region: "Americas",
    countries: ["United States", "Canada", "Mexico"],
  },
  {
    region: "Australia",
    countries: ["Australia"],
  },
];

const GLOBAL_REACH_DESCRIPTION =
  "FirmLeather exports premium full-grain and genuine leather to major international markets worldwide, providing consistent quality leather goods and reliable logistics support tailored to each region's specific import requirements — trusted by global leather suppliers, wholesalers, and manufacturers.";

// SEO Schema markup - GeoShape for multiple regions
const GLOBAL_REACH_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FirmLeather",
  description: "Global leather manufacturer and exporter",
  areaServed: MARKETS.flatMap((market) =>
    market.countries.map((country) => ({
      "@type": "Country",
      name: country,
      region: market.region,
    })),
  ),
  serviceAreas: MARKETS.map((market) => ({
    "@type": "City",
    name: market.region,
  })),
};

// Header Info Card Component
const InfoCard = React.memo(() => (
  <article className="bg-white p-8 rounded-2xl shadow-xl sticky top-24">
    <header className="gap-4 flex items-center mb-6">
      <Globe2
        className="w-10 h-10 text-heading flex-shrink-0"
        aria-hidden="true"
      />
      <h2 className="text-heading text-2xl font-bold uppercase tracking-widest">
        Global Presence
      </h2>
    </header>

    <p
      className="text-stone-600 mb-6 text-justify leading-relaxed"
      itemProp="description"
    >
      {GLOBAL_REACH_DESCRIPTION}
    </p>

    <figure className="mt-6">
      <img
        src="/siteImages/factoryIMages/Global_presence.png"
        alt="FirmLeather's global logistics network and distribution routes"
        className="w-full rounded-lg"
        loading="lazy"
        decoding="async"
      />
      <figcaption className="sr-only">
        Global logistics and export network visualization
      </figcaption>
    </figure>
  </article>
));

InfoCard.displayName = "InfoCard";

// Country List Item Component
const CountryItem = React.memo(({ country }) => (
  <li className="flex items-center text-heading" itemProp="areaServed">
    <span
      className="w-1.5 h-1.5 bg-sub-heading rounded-full mr-3 flex-shrink-0"
      aria-hidden="true"
    />
    {country}
  </li>
));

CountryItem.displayName = "CountryItem";

// Market Region Header Component
const MarketRegionHeader = React.memo(({ region }) => (
  <h3 className="text-2xl font-serif font-bold text-stone-800 mb-4 pb-2 border-b border-stone-100">
    {region}
  </h3>
));

MarketRegionHeader.displayName = "MarketRegionHeader";

// Countries List Component
const CountriesList = React.memo(({ countries }) => (
  <ul className="space-y-2" role="list">
    {countries.map((country, idx) => (
      <CountryItem key={`${country}-${idx}`} country={country} />
    ))}
  </ul>
));

CountriesList.displayName = "CountriesList";

// Market Card Component
const MarketCard = React.memo(({ market, index }) => (
  <article
    className="bg-white p-6 rounded-xl border border-stone-200 hover:border-leather-300 transition-colors shadow-sm"
    role="region"
    aria-label={`Export markets in ${market.region}`}
  >
    <MarketRegionHeader region={market.region} />
    <CountriesList countries={market.countries} />
  </article>
));

MarketCard.displayName = "MarketCard";

// Markets Grid Component
const MarketsGrid = React.memo(({ markets }) => (
  <div className="md:w-2/3 grid sm:grid-cols-2 gap-6 w-full" role="list">
    {markets.map((market, idx) => (
      <MarketCard key={`${market.region}-${idx}`} market={market} index={idx} />
    ))}
  </div>
));

MarketsGrid.displayName = "MarketsGrid";

// Main GlobalReach Component
const GlobalReach = () => {
  const schema = useMemo(() => GLOBAL_REACH_SCHEMA, []);

  return (
    <>
      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <section
        id="globalreach"
        className="py-10 bg-leather-50"
        aria-label="FirmLeather Global Reach and Export Markets"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3">
              <InfoCard />
            </div>
            <MarketsGrid markets={MARKETS} />
          </div>
        </div>
      </section>
    </>
  );
};

export default GlobalReach;
