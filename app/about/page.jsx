"use client";

import AboutIntro from "@/components/about/AboutIntro";
import Services from "@/components/about/Services";
import ManufacturingModels from "@/components/about/ManufacturingModels";
import GlobalReach from "@/components/about/GlobalReach";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import VisionMission from "@/components/about/VisionMission";

const sections = [
  {
    id: "vision",
    component: VisionMission,
    padded: false,
  },
  {
    id: "about",
    component: AboutIntro,
    padded: true,
  },
  {
    id: "services",
    component: Services,
    padded: true,
  },
  {
    id: "models",
    component: ManufacturingModels,
    padded: true,
  },
  {
    id: "global",
    component: GlobalReach,
    padded: true,
  },
  {
    id: "why-us",
    component: WhyChooseUs,
    padded: true,
  },
];

export default function AboutPage() {
  return (
    <main className="bg-stone-950 text-white">
      {sections.map((section) => {
        const Component = section.component;

        return (
          <section
            key={section.id}
            id={section.id}
            className={section.padded ? "px-6 py-20 lg:px-10" : ""}
          >
            <Component />
          </section>
        );
      })}
    </main>
  );
}
