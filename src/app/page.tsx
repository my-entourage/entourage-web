import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FlowDiagram } from "@/components/FlowDiagram";
import { ValueProps } from "@/components/ValueProps";
import { SecondaryCTA } from "@/components/SecondaryCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FlowDiagram />
        <ValueProps />
        <SecondaryCTA />
      </main>
      <Footer />
    </>
  );
}
