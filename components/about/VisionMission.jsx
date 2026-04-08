"use client";
import React, { useMemo } from "react";

// Configuration constants
const VISION_MISSION_STATEMENTS = [
  {
    id: "vision",
    number: "01",
    title: "Our Vision",
    description:
      "To be a globally recognized leather manufacturer, delivering superior-quality leather and leather products with a commitment to excellence, sustainability, and competitive pricing.",
    type: "vision",
  },
  {
    id: "mission",
    number: "02",
    title: "Our Mission",
    description:
      "To become a leading leather manufacturing company, driving innovation, ethical production, and value-added solutions while expanding into high-quality finished leather garments and goods.",
    type: "mission",
  },
];

// SEO Schema for organization
const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FirmLeather",
  description: "Premium leather manufacturer and exporter",
  areaServed: "Worldwide",
  vision: VISION_MISSION_STATEMENTS.find((item) => item.type === "vision")
    ?.description,
  mission: VISION_MISSION_STATEMENTS.find((item) => item.type === "mission")
    ?.description,
};

// Statement Number Badge Component
const StatementNumber = React.memo(({ number }) => (
  <span className="text-heading text-4xl shrink-0" aria-hidden="true">
    {number}
  </span>
));

StatementNumber.displayName = "StatementNumber";

// Statement Title Component
const StatementTitle = React.memo(({ title, id }) => (
  <h3
    id={`statement-${id}`}
    className="text-2xl font-serif font-bold text-white mb-0"
  >
    {title}
  </h3>
));

StatementTitle.displayName = "StatementTitle";

// Statement Description Component
const StatementDescription = React.memo(({ description, type }) => (
  <p
    className="text-stone-300 text-lg leading-relaxed italic"
    itemProp={type === "vision" ? "vision" : "mission"}
  >
    {description}
  </p>
));

StatementDescription.displayName = "StatementDescription";

// Vision/Mission Card Component
const VisionMissionCard = React.memo(({ statement }) => (
  <article
    className="bg-stone-800/50 backdrop-blur-sm p-10 rounded-xl border-l-4 border-sub-heading"
    role="region"
    aria-labelledby={`statement-${statement.id}`}
    itemProp={statement.type === "vision" ? "hasStatement" : "hasStatement"}
    itemScope
    itemType="https://schema.org/Statement"
  >
    <div className="flex items-center gap-3 mb-6">
      <StatementNumber number={statement.number} />
      <StatementTitle title={statement.title} id={statement.id} />
    </div>
    <StatementDescription
      description={statement.description}
      type={statement.type}
    />
    <meta itemProp="name" content={statement.title} />
    <meta itemProp="text" content={statement.description} />
  </article>
));

VisionMissionCard.displayName = "VisionMissionCard";

// Statements Grid Component
const StatementsGrid = React.memo(({ statements }) => (
  <div className="grid md:grid-cols-2 gap-12" role="list">
    {statements.map((statement) => (
      <VisionMissionCard key={statement.id} statement={statement} />
    ))}
  </div>
));

StatementsGrid.displayName = "StatementsGrid";

// Background Decoration Component
const BackgroundDecoration = React.memo(() => (
  <div
    className="absolute inset-0 opacity-5"
    aria-hidden="true"
    style={{
      backgroundImage:
        "radial-gradient(circle at 50% 50%, rgb(210, 180, 140) 0%, transparent 50%)",
    }}
  />
));

BackgroundDecoration.displayName = "BackgroundDecoration";

// Main VisionMission Component
const VisionMission = () => {
  const schema = useMemo(() => ORGANIZATION_SCHEMA, []);
  const statements = useMemo(() => VISION_MISSION_STATEMENTS, []);

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
        className="relative py-24 bg-stone-900 overflow-hidden"
        aria-label="FirmLeather Vision and Mission Statements"
        itemScope
        itemType="https://schema.org/Organization"
      >
        {/* Background Decoration */}
        <BackgroundDecoration />

        <div className="container mx-auto px-6 relative z-10">
          <StatementsGrid statements={statements} />
        </div>
      </section>
    </>
  );
};

export default VisionMission;
