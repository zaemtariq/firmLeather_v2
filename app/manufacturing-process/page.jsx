import { FACTORY_STATIONS } from "../../components/constants/constants";
import {
  CheckCircle2,
  Factory,
  PackageCheck,
  Ruler,
  ShieldCheck,
} from "lucide-react";

const HERO = {
  eyebrow: "Manufacturing Process",
  title: "Leather made with discipline, craft, and export-ready control.",
  description:
    "Our workflow keeps every hide, cut, stitch, and finish traceable through a focused production sequence built for consistent bulk quality.",
  videoUrl: "/siteVideo/hero_factory_video.mp4",
};

const HERO_STATS = [
  { label: "Process Stages", value: FACTORY_STATIONS.length },
  { label: "Sizing Control", value: "0.1mm" },
  { label: "Final Audit", value: "100%" },
];

const QUALITY_POINTS = [
  {
    icon: ShieldCheck,
    title: "Controlled Standards",
    text: "Each stage is checked against buyer specifications before moving forward.",
  },
  {
    icon: Ruler,
    title: "Precise Sizing",
    text: "Cutting, stitching, and fitting are kept consistent for repeat production.",
  },
  {
    icon: PackageCheck,
    title: "Export Ready",
    text: "Final packing is prepared for safe shipping and clean brand presentation.",
  },
];

const cleanAssetPath = (path = "") => path.replace(/^\.\//, "/");

function HeroSection() {
  return (
    <header className="relative min-h-[72vh] overflow-hidden bg-stone-950 text-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-45"
        aria-label="Firm Leather factory process video"
      >
        <source src={HERO.videoUrl} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-black/20" />

      <div className="relative mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-end px-6 pb-12 pt-32 lg:px-12">
        <p className="mb-5 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.35em] text-amber-300">
          <Factory className="h-5 w-5" aria-hidden="true" />
          {HERO.eyebrow}
        </p>
        <h1 className="max-w-4xl font-heading12 text-5xl font-bold leading-[1.02] text-white md:text-7xl">
          {HERO.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
          {HERO.description}
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-3 lg:max-w-3xl">
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="border-t border-white/25 pt-4">
              <p className="text-3xl font-heading12 font-bold text-white">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

function OverviewSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-sub-heading">
            Built For Consistency
          </p>
          <h2 className="mt-4 font-heading12 text-4xl font-bold leading-tight text-stone-950 md:text-5xl">
            A simpler view of how every product moves through our factory.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {QUALITY_POINTS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="border-l-2 border-leather-200 pl-5">
              <Icon className="mb-4 h-6 w-6 text-sub-heading" aria-hidden="true" />
              <h3 className="text-lg font-bold text-stone-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ process, index }) {
  const isReversed = index % 2 !== 0;
  const stepNumber = (index + 1).toString().padStart(2, "0");

  return (
    <article
      id={`step-${index + 1}`}
      className="border-t border-stone-200 py-14"
    >
      <div
        className={`grid gap-10 lg:grid-cols-2 lg:items-center ${
          isReversed ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="relative overflow-hidden rounded-md bg-stone-900 shadow-xl">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="aspect-[16/10] h-full w-full object-cover"
            aria-label={`${process.name} manufacturing process video`}
            title={`${process.name} at Firm Leather`}
          >
            <source src={cleanAssetPath(process.videoUrl)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/80">
              Factory Stage
            </p>
          </div>
        </div>

        <div className="max-w-xl">
          <div className="flex items-start gap-4">
            <span className="font-heading12 text-4xl font-bold leading-none text-sub-heading md:text-5xl">
              {stepNumber}
            </span>
            <h2 className="font-heading12 text-3xl font-bold leading-tight text-stone-950 md:text-4xl">
              {process.name}
            </h2>
          </div>
          <p className="mt-5 text-base leading-8 text-stone-600">
            {process.description}
          </p>
          <ul className="mt-7 grid gap-3 border-t border-stone-200 pt-6">
            {process.details.map((detail) => (
              <li key={detail} className="flex gap-3 text-sm leading-6 text-stone-700">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-sub-heading"
                  aria-hidden="true"
                />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function ManufacturingProcess() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-950 selection:bg-leather-200">
      <HeroSection />
      <OverviewSection />

      <main
        id="process"
        className="bg-stone-50 py-8"
        role="main"
        aria-label="Leather manufacturing process steps"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {FACTORY_STATIONS.map((process, index) => (
            <ProcessStep key={process.id} process={process} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
}
