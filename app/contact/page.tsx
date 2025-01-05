import { ContactHero } from "./components/contact-hero";
import { InfoSection } from "./components/info-section";
import { ContactForm } from "./components/contact-form";
import { Card } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactHero />
      
      <div className="container mx-auto px-4 py-16">
        <InfoSection />
        
        <div className="mt-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">예약 문의하기</h2>
            <ContactForm />
          </Card>
        </div>

        <div className="mt-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">오시는 길</h2>
            <div className="aspect-video bg-gray-100 rounded-lg">
              {/* 카카오맵 연동 예정 */}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}