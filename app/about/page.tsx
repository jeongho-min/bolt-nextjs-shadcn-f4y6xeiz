import { AboutHero } from "./components/about-hero";
import { GreetingSection } from "./components/greeting-section";
import { PhilosophySection } from "./components/philosophy-section";

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <GreetingSection />
      <PhilosophySection />
    </div>
  );
}