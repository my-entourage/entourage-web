import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TeamCredentialsSection } from "@/components/TeamCredentialsSection";
import { FlowSection } from "@/components/FlowSection";
import { BentoFeatures } from "@/components/BentoFeatures";
import { FAQ } from "@/components/FAQ";
import { SecondaryCTA } from "@/components/SecondaryCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TeamCredentialsSection />
        <FlowSection />
        <BentoFeatures />
        <SecondaryCTA />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
