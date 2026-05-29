"use client";
import React, { useMemo } from "react";
import { ShieldCheck, Settings, Award, Leaf, Truck } from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Premium Leather Materials",
      text: "Full-grain, top-grain, genuine, and vegan leather, ethically sourced.",
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Custom Manufacturing",
      text: "OEM & ODM solutions tailored specifically to your brand’s unique identity.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Skilled Craftsmanship",
      text: "Expert artisans ensuring precision stitching and flawless finishing.",
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Sustainable & Ethical",
      text: "Compliance with ISO and REACH standards using eco-friendly processes.",
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Global Supply Chain",
      text: "Serving international brands with consistent quality and timely delivery.",
    },
  ];

  return (
    <section id="whychooseus" className="py-20 bg-stone-50/50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Column */}
          <div className="space-y-10">
            <div>
              <span className="text-amber-800 font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
                Why Choose Us
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-medium text-stone-900 leading-tight">
                Excellence in <br />
                <span className="italic">Every Stitch</span>
              </h2>
            </div>

            <div className="grid gap-2">
              {reasons.map((reason, idx) => (
                <div
                  key={idx}
                  className="group flex gap-5 p-5 rounded-2xl bg-white shadow-sm transition-all duration-300 border "
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-stone-100 text-amber-900 group-hover:bg-primary-hover group-hover:text-white rounded-xl flex items-center justify-center transition-colors">
                    {reason.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-800 mb-1">
                      {reason.title}
                    </h3>
                    <p className="text-stone-600 leading-relaxed text-sm md:text-base">
                      {reason.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Column */}
          <div className="relative flex justify-center items-center">
            {/* Decorative Background Element */}
            <div className="absolute inset-0 bg-stone-200 rounded-3xl transform -rotate-3 translate-x-4 scale-95 z-0"></div>

            {/* Video Container */}
            <div className="relative z-10 w-full overflow-hidden rounded-3xl shadow-2xl bg-stone-900 aspect-[4/5] lg:aspect-square">
              <video
                className="w-full h-full object-cover opacity-90"
                src="/siteImages/factoryIMages/stitch.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
              {/* Subtle Overlay to make it feel premium */}
              <div className="absolute inset-0 from-stone-900/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
