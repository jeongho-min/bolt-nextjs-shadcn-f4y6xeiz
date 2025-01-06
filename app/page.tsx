import { HeroSection } from "@/components/home/hero-section";
import { CertificationSection } from "@/components/home/certification-section";
import { HistorySection } from "@/components/home/history-section";
import { DepartmentsSection } from "@/components/home/departments-section";
import { FacilitySection } from "@/components/home/facility-tour/facility-section";
import { AppointmentWidget } from "@/components/home/appointment-widget";
import { OfficeHoursSection } from "@/components/home/office-hours-section";
import { ReviewSection } from "@/components/home/reviews/review-section";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CertificationSection />
      <HistorySection />
      <DepartmentsSection />
      {/* <FacilitySection /> */}
      <ReviewSection />
      <div className="container mx-auto px-4 py-16 grid gap-8 md:grid-cols-2">
        {/* <AppointmentWidget /> */}
        {/* <OfficeHoursSection /> */}
      </div>
    </main>
  );
}
