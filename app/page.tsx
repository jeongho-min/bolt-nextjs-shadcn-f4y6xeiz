import { CertificationSection } from "@/components/home/certification-section";
import { DoctorsSection } from "@/components/home/doctors-section";
import { HeroSection } from "@/components/home/hero-section";
import { HistorySection } from "@/components/home/history-section";
import { ReviewSection } from "@/components/home/reviews/review-section";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CertificationSection />
      <HistorySection />
      {/* <DoctorsSection /> */}
      {/* <DepartmentsSection /> */}
      <ReviewSection />
      {/* <FacilitySection /> */}
      <div className="container mx-auto px-4 py-16 grid gap-8 md:grid-cols-2">
        {/* <AppointmentWidget /> */}
        {/* <OfficeHoursSection /> */}
      </div>
    </main>
  );
}
