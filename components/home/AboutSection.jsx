"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Factory,
  Globe2,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";

const stats = [
  { value: "2017", label: "Established" },
  { value: "30+", label: "Export Markets" },
  { value: "500K", label: "Annual Capacity" },
];

const sliderImages = [
  {
    src: "/siteImages/factoryIMages/11.png",
    alt: "FirmLeather manufacturing floor",
    label: "Manufacturing floor",
  },
  {
    src: "/siteImages/factoryIMages/12.png",
    alt: "Leather tannery process",
    label: "Leather preparation",
  },
  {
    src: "/siteImages/factoryIMages/13.png",
    alt: "FirmLeather production partnership",
    label: "Stitching",
  },
  {
    src: "/siteImages/factoryIMages/14.png",
    alt: "FirmLeather production partnership",
    label: "Stitching",
  },
  {
    src: "/siteImages/factoryIMages/15.png",
    alt: "FirmLeather production partnership",
    label: "Stitching",
  },
  {
    src: "/siteImages/factoryIMages/16.png",
    alt: "FirmLeather production partnership",
    label: "Stitching",
  },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FirmLeather",
  description: "Premium leather goods manufacturer and exporter since 2017",
  url: "https://www.firmleather.com",
  foundingDate: "2017",
  foundingLocation: {
    "@type": "Place",
    name: "Sialkot, Pakistan",
  },
};

export default function AboutSection() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % sliderImages.length);
    }, 2500);

    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = sliderImages[activeImage];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <section
        className="bg-white px-5 py-16 text-stone-900 sm:px-6 lg:px-8"
        aria-label="About FirmLeather"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              About FirmLeather
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-extrabold leading-tight text-stone-950 sm:text-5xl">
              Leather manufacturing with craft, control, and export discipline.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600">
              FirmLeather produces leather goods, garments, sports gear, and
              finished leather for brands that need dependable quality at
              production scale. Our work combines hands-on craftsmanship with a
              practical factory process, so every order can move from material
              selection to final packing with clear standards.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-stone-200 bg-leather-50 p-4"
                >
                  <p className="text-2xl font-extrabold text-primary">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-stone-600">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/about"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-primary-hover"
              >
                Learn More
              </Link>
              <Link
                href="/factory-tour"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-stone-300 px-6 text-sm font-bold uppercase tracking-wide text-stone-900 transition hover:border-primary hover:text-primary"
              >
                Factory Tour
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="relative min-h-[380px] overflow-hidden rounded-lg bg-stone-950 shadow-sm sm:min-h-[480px]">
              <Image
                key={currentSlide.src}
                src={currentSlide.src}
                alt={currentSlide.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-stone-950 via-stone-950/70 to-transparent p-6 text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-200 backdrop-blur">
                  <PackageCheck className="h-4 w-4" aria-hidden="true" />
                  {currentSlide.label}
                </div>
                <p className="mt-4 max-w-md text-sm leading-6 text-stone-200">
                  Custom production, finishing, and packaging support for buyers
                  who need repeatable leather quality.
                </p>
              </div>

              <div className="absolute left-6 top-6 flex gap-2">
                {sliderImages.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      activeImage === index
                        ? "w-8 bg-white"
                        : "w-2.5 bg-white/45 hover:bg-white/80"
                    }`}
                    aria-label={`Show ${image.label}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
