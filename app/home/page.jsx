import AboutSection from "@/components/home/AboutSection";
import ProcessSection from "@/components/home/ProcessSection";
import CustomServiceSection from "@/components/home/CustomServicesSection";
import ContactSection from "@/components/home/ContactSection";
import Hero from "@/components/home/Hero";
import { ProductLineSection } from "@/components/home/ProductLineSection";

export default function Home() {
  return (
    <div className="font-sans text-dark bg-light leading-relaxed">
      <Hero />
      <AboutSection />
      <ProductLineSection />
      <ProcessSection />
      <CustomServiceSection />
      <ContactSection />
    </div>
  );
}
