import { FacilitiesHero } from "./components/facilities-hero";
import { FacilitiesList } from "./components/facilities-list";
import { EquipmentSection } from "./components/equipment-section";

export default function FacilitiesPage() {
  return (
    <main className="min-h-screen">
      <FacilitiesHero />
      <FacilitiesList />
      <EquipmentSection />
    </main>
  );
}