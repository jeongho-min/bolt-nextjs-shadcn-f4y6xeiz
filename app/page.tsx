import { HeroSection } from "@/components/home/hero-section";
import { DepartmentsSection } from "@/components/home/departments-section";
import { StaffSection } from "@/components/home/medical-staff/staff-section";
import { FacilitySection } from "@/components/home/facility-tour/facility-section";
import { AppointmentWidget } from "@/components/home/appointment-widget";
import { OfficeHoursSection } from "@/components/home/office-hours-section";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <DepartmentsSection />
      <StaffSection />
      <FacilitySection />
      <div className="container mx-auto px-4 py-16 grid gap-8 md:grid-cols-2">
        <AppointmentWidget />
        <OfficeHoursSection />
      </div>
    </main>
  );
}