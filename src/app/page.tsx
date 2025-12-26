import { Header, Footer } from "@/components/layout";
import {
  Hero,
  TeamCredentialsSection,
  FlowSection,
  BentoFeatures,
  FAQ,
  SecondaryCTA,
} from "@/components/sections";

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
