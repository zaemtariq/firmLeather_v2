import React from "react";
import Image from "next/image";
import { Factory, PenTool, CheckCircle2 } from "lucide-react";

const SERVICES = [
  {
    id: "manufacturing",
    title: "Manufacturing for Brands",
    icon: Factory,
    image: "/siteImages/factoryIMages/leather_manufacturer.jpg",
    description:
      "Scale your business with premium private label manufacturing. We produce high-quality leather goods tailored to your designs, specifications, and brand standards.",
    features: [
      "Prototype development & sampling",
      "Custom hardware & branding embossing",
      "Low MOQs for startups",
    ],
    button: "Partner With Us",
  },
  {
    id: "customization",
    title: "Customized for You",
    icon: PenTool,
    image: "/siteImages/factoryIMages/cumtomize_for_you.jpg",
    description:
      "From corporate gifting to personal luxury, we craft bespoke leather pieces tailored to your exact preferences and requirements.",
    features: [
      "Personalized monograms & engraving",
      "Choice of premium leathers & colors",
      "Made-to-order sizing",
    ],
    button: "Start Customizing",
  },
];

export default function CustomServicesSection() {
  return (
    <section className="bg-stone-950 py-28 text-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm uppercase tracking-[0.25em] text-amber-500">
            Our Services
          </span>

          <h2 className="mt-4 text-4xl text-amber-800 font-bold tracking-tight md:text-5xl">
            Beyond Off-the-Shelf Leather
          </h2>

          <p className="mt-6 text-lg leading-8 text-stone-400">
            We do not just manufacture leather products; we help brands and
            individuals build premium experiences through reliable craftsmanship
            and customization.
          </p>
        </div>

        {/* Services */}
        <div className="mt-20 space-y-16">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.id}
                className="group overflow-hidden rounded-[2rem] border border-stone-800 bg-stone-900/60 backdrop-blur-sm"
              >
                <div
                  className={`grid items-center lg:grid-cols-2 ${
                    index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-[350px]  overflow-hidden lg:h-[500px]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/20" />
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-12 lg:p-16">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-500">
                      <Icon size={30} />
                    </div>

                    <h3 className="text-3xl text-amber-800 font-semibold md:text-4xl">
                      {service.title}
                    </h3>

                    <p className="mt-5 max-w-xl text-lg leading-8 text-stone-400">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="mt-8 space-y-4">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 ">
                          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-amber-500" />
                          <span className="text-amber-600">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href="#contact"
                      className="mt-10 inline-flex items-center rounded-full border border-amber-500 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-amber-500 transition hover:bg-amber-500 hover:text-black"
                    >
                      {service.button}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
