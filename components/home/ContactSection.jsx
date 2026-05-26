"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Factory, Send, Mail, Phone } from "lucide-react";

const FEATURES = [
  {
    icon: Factory,
    title: "Custom Manufacturing",
    description:
      "Private label leather production tailored to your specifications, finishes, branding, and wholesale needs.",
  },
  {
    icon: Send,
    title: "Global Shipping",
    description:
      "Reliable international logistics with secure worldwide delivery and competitive export pricing.",
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setForm({
        name: "",
        company: "",
        email: "",
        message: "",
      });
    }, 2000);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-stone-950 py-28 text-white"
    >
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/siteImages/factoryIMages/partner_us.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <span className="text-sm uppercase tracking-[0.25em] text-amber-500">
              Exports & Wholesale
            </span>

            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
              Partner With
              <span className="block text-amber-500 italic">FirmLeather</span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-400">
              Looking for a trusted leather manufacturing partner? We help
              brands, wholesalers, and retailers source premium leather goods
              with reliable production and worldwide delivery.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-8">
              {FEATURES.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
                      <Icon size={24} />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold">{item.title}</h3>

                      <p className="mt-2 text-stone-400">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact Info */}
            <div className="mt-12 border-t border-white/10 pt-8 space-y-4">
              <a
                href="mailto:exports@firmleather.com"
                className="flex items-center gap-3 text-stone-300 transition hover:text-white"
              >
                <Mail className="h-5 w-5 text-amber-500" />
                exports@firmleather.com
              </a>

              <a
                href="tel:+923343000580"
                className="flex items-center gap-3 text-stone-300 transition hover:text-white"
              >
                <Phone className="h-5 w-5 text-amber-500" />
                +92 334 3000580
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-[2rem] border border-stone-800 bg-stone-900/70 p-8 backdrop-blur-sm md:p-10">
            <h3 className="text-3xl font-semibold">Send an Inquiry</h3>

            <p className="mt-2 text-stone-400">
              Tell us about your requirements and our team will respond within
              24 hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="rounded-2xl border border-stone-700 bg-stone-950 px-5 py-4 outline-none transition focus:border-amber-500"
                />

                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={form.company}
                  onChange={handleChange}
                  required
                  className="rounded-2xl border border-stone-700 bg-stone-950 px-5 py-4 outline-none transition focus:border-amber-500"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-stone-700 bg-stone-950 px-5 py-4 outline-none transition focus:border-amber-500"
              />

              <textarea
                name="message"
                rows={5}
                placeholder="Tell us about your project, order quantity, or product requirements..."
                value={form.message}
                onChange={handleChange}
                required
                className="w-full resize-none rounded-2xl border border-stone-700 bg-stone-950 px-5 py-4 outline-none transition focus:border-amber-500"
              />

              <button
                type="submit"
                disabled={submitted}
                className="w-full rounded-2xl bg-amber-500 py-4 font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
              >
                {submitted ? "Inquiry Sent" : "Submit Inquiry"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
