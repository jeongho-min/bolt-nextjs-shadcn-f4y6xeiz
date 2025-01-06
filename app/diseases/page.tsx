import { DiseasesHero } from "./components/diseases-hero";
import { DiseaseList } from "./components/disease-list/disease-list";

export default function DiseasesPage() {
  return (
    <main>
      <DiseasesHero />
      <DiseaseList />
    </main>
  );
}
