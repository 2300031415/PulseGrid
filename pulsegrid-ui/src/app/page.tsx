import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/hero/Hero";
import Benefits from "@/components/landing/sections/Benefits";
import Features from "@/components/landing/sections/Features";
import Workflow from "@/components/landing/sections/Workflow";
import Stats from "@/components/landing/sections/Stats";
import CTA from "@/components/landing/sections/CTA";

export default function Home() {
  return (
    <main className="bg-[#F8FBFC] min-h-screen">
      <Navbar />
      <Hero />
      <Benefits />
      <Features />
      <Workflow />
      <Stats />
      <CTA />
    </main>
  );
}