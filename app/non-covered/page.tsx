import { NonCoveredSection } from "@/app/services/components/non-covered-section";
import { NonCoveredHero } from "./components/hero";

export default function NonCoveredPage() {
  return (
    <main className="pt-16">
      <NonCoveredHero />
      <NonCoveredSection />
    </main>
  );
}
