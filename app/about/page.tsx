import { AboutHero } from "./components/about-hero";
import { GreetingSection } from "./components/greeting-section";
import { EducationSection } from "./components/education-section";
import { PhilosophySection } from "./components/philosophy-section";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <GreetingSection />
      <EducationSection />
      <PhilosophySection />
    </main>
  );
}
