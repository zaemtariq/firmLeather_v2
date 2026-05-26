"use client";

export default function Hero() {
  const scrollToProducts = () => {
    document.getElementById("product-Line")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-black text-white">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/siteImages/factoryIMages/hero-image.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/siteVideo/hero_factory_video.mp4" type="video/mp4" />
      </video>

      {/* Luxury Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 md:pb-24">
        <div className="max-w-4xl">
          <span className="mb-5 inline-block text-sm uppercase tracking-[0.3em] text-amber-500">
            Premium Leather Manufacturer
          </span>

          <h1 className="text-5xl font-bold leading-[0.95] md:text-7xl lg:text-8xl">
            From Raw Hides
            <span className="mt-3 block italic text-amber-500">
              To Refined Leather Goods
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-stone-300 md:text-xl">
            A trusted leather goods manufacturer and exporter for brands,
            retailers, and global partners seeking premium craftsmanship and
            scalable production.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={scrollToProducts}
              className="rounded-full bg-amber-500 px-8 py-4 font-semibold text-black transition hover:scale-[1.02]"
            >
              View Collection
            </button>

            <a
              href="#contact"
              className="rounded-full border border-white/20 px-8 py-4 font-semibold backdrop-blur-sm transition hover:bg-white hover:text-black"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
