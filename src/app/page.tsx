import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { IntegrationsSection } from "@/components/IntegrationsSection";
import { FlowSection } from "@/components/FlowSection";
import { DataFolderSection } from "@/components/DataFolderSection";
import { TeamCredentialsSection } from "@/components/TeamCredentialsSection";
import { ValueProps } from "@/components/ValueProps";
import { SecondaryCTA } from "@/components/SecondaryCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TeamCredentialsSection />
        <IntegrationsSection />
        <FlowSection />
        <DataFolderSection />
        <ValueProps />
        <SecondaryCTA />
      </main>
      <Footer />
    </>
  );
}
