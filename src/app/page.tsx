import { Header, Footer } from "@/components/layout";
import {
  Hero,
  TeamCredentialsSection,
  FlowSection,
  BentoFeatures,
  FAQ,
  SecondaryCTA,
} from "@/components/sections";

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Entourage",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Web",
  description:
    "AI-powered task extraction platform that automatically extracts actionable items from meetings, chats, emails, and documents.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema).replace(/</g, "\\u003c"),
        }}
      />
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
