import { ServicesHero } from "./components/hero";
import { DepartmentList } from "./components/departments/department-list";
import { TreatmentProcess } from "./components/treatment/treatment-process";

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <ServicesHero />
      <DepartmentList />
      <TreatmentProcess />
    </main>
  );
}