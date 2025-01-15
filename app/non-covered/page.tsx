import { NonCoveredHero } from "./components/hero";
import { NonCoveredSection } from "./components/non-covered-section";

export default function NonCoveredPage() {
  return (
    <main className="pt-16">
      <NonCoveredHero />
      <NonCoveredSection />
    </main>
  );
}
