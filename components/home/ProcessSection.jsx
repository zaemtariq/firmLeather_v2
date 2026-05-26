import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  Factory,
  PenTool,
  Truck,
} from "lucide-react";

const processSteps = [
  {
    title: "Brief",
    description:
      "We align on product type, material, sizing, branding, quantity, and target delivery requirements.",
    icon: ClipboardCheck,
  },
  {
    title: "Sample",
    description:
      "Patterns, trims, stitching, and finishing details are checked through a physical sample before production.",
    icon: PenTool,
  },
  {
    title: "Produce",
    description:
      "Approved orders move through cutting, stitching, finishing, and quality checks with factory oversight.",
    icon: Factory,
  },
  {
    title: "Ship",
    description:
      "Finished goods are packed for export and prepared for reliable delivery to your destination.",
    icon: Truck,
  },
];

export default function ProcessSection() {
  return (
    <section
      className="bg-leather-50 px-5 py-16 text-stone-900 sm:px-6 lg:px-8"
      aria-label="FirmLeather manufacturing process"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Our Process
            </p>
            <h2 className="mt-4 max-w-xl text-4xl font-extrabold leading-tight text-stone-950 sm:text-5xl">
              From product brief to export-ready leather goods.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-stone-600 lg:justify-self-end">
            Our workflow is built for buyers who need clarity before production
            and consistency during production. Each step keeps decisions,
            samples, quality checks, and shipping requirements visible.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[360px] overflow-hidden rounded-lg bg-stone-950 shadow-sm lg:min-h-full">
            <Image
              src="/siteImages/factoryIMages/cumtomize_for_you.jpg"
              alt="FirmLeather custom leather production"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-stone-950 via-stone-950/65 to-transparent p-6 text-white">
              <p className="text-sm font-bold uppercase tracking-wide text-amber-200">
                Custom manufacturing support
              </p>
              <p className="mt-3 max-w-md text-sm leading-6 text-stone-200">
                Built for private-label collections, wholesale orders, and
                product runs that need reliable repeatability.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {processSteps.map(({ title, description, icon: Icon }, index) => (
              <article
                key={title}
                className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-leather-300 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-leather-100 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-sm font-bold text-stone-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-extrabold text-stone-950">
                  {title}
                </h3>
                <p className="mt-3 leading-7 text-stone-600">{description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/manufacturing-process"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-primary-hover"
          >
            View Full Process
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/get-quote/general"
            className="inline-flex h-12 items-center justify-center rounded-full border border-stone-300 bg-white px-6 text-sm font-bold uppercase tracking-wide text-stone-900 transition hover:border-primary hover:text-primary"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  );
}
