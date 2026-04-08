import React, { useMemo } from "react";
import { MessageSquare, PenTool, Factory, Truck } from "lucide-react";

// Process steps configuration
const PROCESS_STEPS = [
  {
    id: 1,
    number: "1",
    title: "Consultation",
    icon: MessageSquare,
    description:
      "We discuss your design specifications, material requirements, quality standards, and target price points in detail.",
    shortDescription:
      "We discuss your design specs, material needs, and target price points.",
  },
  {
    id: 2,
    number: "2",
    title: "Prototyping",
    icon: PenTool,
    description:
      "Our skilled sample room creates a detailed physical sample for your review and approval before production begins.",
    shortDescription:
      "Our sample room creates a physical sample for your approval.",
  },
  {
    id: 3,
    number: "3",
    title: "Production",
    icon: Factory,
    description:
      "Manufacturing begins with strict quality control checks at every stage of production to ensure excellence.",
    shortDescription:
      "Manufacturing begins with strict quality control checks at every stage.",
  },
  {
    id: 4,
    number: "4",
    title: "Global Delivery",
    icon: Truck,
    description:
      "We handle all logistics to ship your finished leather goods anywhere in the world with reliable partners.",
    shortDescription:
      "We handle logistics to ship your goods anywhere in the world.",
  },
];

// Schema markup for the process
const PROCESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "FirmLeather Partnership Process",
  description:
    "The step-by-step process for partnering with FirmLeather for leather goods manufacturing",
  step: PROCESS_STEPS.map((step) => ({
    "@type": "HowToStep",
    position: step.id,
    name: `${step.number}. ${step.title}`,
    text: step.description,
  })),
};

// ProcessStep Component - Reusable and memoized
const ProcessStep = React.memo(({ step, totalSteps }) => {
  const Icon = step.icon;

  return (
    <div
      className="relative z-10 flex-1 px-5 group"
      role="listitem"
      itemScope
      itemType="https://schema.org/HowToStep"
    >
      {/* Icon Circle */}
      <div
        className="w-16 h-16 bg-white border-2 border-primary rounded-full flex items-center justify-center mx-auto mb-5 text-primary transition-colors duration-300 group-hover:bg-primary-hover group-hover:text-white shadow-sm focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
        aria-hidden="true"
      >
        <Icon size={24} />
      </div>

      {/* Step Content */}
      <meta itemProp="position" content={step.id} />
      <h4 className="text-lg font-bold mb-2 text-gray-900" itemProp="name">
        {step.number}. {step.title}
      </h4>
      <p className="text-sm text-gray-500 leading-relaxed" itemProp="text">
        {step.shortDescription}
      </p>

      {/* Hidden full description for SEO */}
      <p className="sr-only">{step.description}</p>
    </div>
  );
});

ProcessStep.displayName = "ProcessStep";

export default function ProcessSection() {
  // Memoize data
  const steps = useMemo(() => PROCESS_STEPS, []);
  const schema = useMemo(() => PROCESS_SCHEMA, []);
  const totalSteps = useMemo(() => steps.length, [steps]);

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
        className="py-24 bg-white text-center"
        aria-label="Partnership Process with FirmLeather"
        role="region"
      >
        <div className="max-w-[1200px] mx-auto px-5">
          {/* Section Header */}
          <header className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-3 text-gray-900">
              The Partnership Process
            </h2>
            <p className="text-gray-500 font-serif italic text-xl">
              Simple steps to build your brand with FirmLeather
            </p>
          </header>

          {/* Process Timeline */}
          <div
            className="relative flex flex-col md:flex-row justify-between gap-10 md:gap-0 mt-16"
            role="list"
            aria-label="Partnership steps"
          >
            {/* Connecting Line - Desktop Only */}
            <div
              className="hidden md:block absolute top-[30px] left-[50px] right-[50px] h-[2px] bg-gray-200 z-0"
              aria-hidden="true"
            />

            {/* Process Steps */}
            {steps.map((step) => (
              <ProcessStep key={step.id} step={step} totalSteps={totalSteps} />
            ))}
          </div>

          {/* Summary text for accessibility */}
          <p className="sr-only">
            Our partnership process consists of four main stages: initial
            consultation to understand your needs, prototyping to create samples
            for approval, production with quality control, and finally global
            delivery of your leather goods.
          </p>
        </div>
      </section>
    </>
  );
}
