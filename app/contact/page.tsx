import { ContactHero } from "./components/contact-hero";
import { InfoSection } from "./components/info-section";
import { ContactForm } from "./components/contact-form";
import { Card } from "@/components/ui/card";
import { KakaoMap } from "@/components/map/kakao-map";

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
            <div className="space-y-4">
              <KakaoMap />
              <div className="text-gray-600">
                <p>주소: 병원 지하 1층과 병원 뒷쪽 공영주차장(이용시까지 주차비 지급)</p>
                <p>전화: 062-369-2075 (이명치료)</p>
                <p>전화: 062-571-2222</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
