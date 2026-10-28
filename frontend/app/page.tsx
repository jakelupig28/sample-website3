import Hero from "@/components/Hero";
import ToolkitSection from "@/components/ToolkitSection";
import ChaosToCalmSection from "@/components/ChaosToCalmSection";
import ServicesSection from "@/components/ServicesSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import ProofSection from "@/components/ProofSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* 01 — The Catalogue: Imprints & Publishers */}
      <ToolkitSection />

      {/* 02 — The Difference: From Chaos → Calm Scroll-Linked Stage */}
      <ChaosToCalmSection />

      {/* 03 — Offerings: Six Ways We Bring Slow Reading Back */}
      <ServicesSection />

      {/* 04 — The Ritual: How Our Curation Cadence Works */}
      <HowWeWorkSection />

      {/* 05 — On the Tables & Reader Notes: Curated Stacks & Proof */}
      <ProofSection />

      {/* 06 — Memberships & Parcels: Simple, Honest Pricing */}
      <PricingSection />

      {/* 07 — Questions & Answers: Zero-Jargon FAQ */}
      <FaqSection />

      {/* 08 — Closing Expansion Card & Editorial Colophon Footer */}
      <Footer />
    </>
  );
}
