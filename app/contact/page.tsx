"use client";

import { ReservationDialog } from "@/components/home/reservation-dialog";
import { KakaoMap } from "@/components/map/kakao-map";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarDays, Clock, Phone } from "lucide-react";
import { useState } from "react";
import { ContactHero } from "./components/contact-hero";
import { useHospital } from "@/app/providers/hospital-provider";
import { BrandLoader } from "@/components/ui/brand-loader";

export default function ContactPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { hospitalInfo, isLoading } = useHospital();

  if (isLoading || !hospitalInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BrandLoader variant="default" />
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <ContactHero />

      <div className="container mx-auto px-4 py-16">
        <div className="mt-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">예약 문의하기</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">전화 예약</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  {hospitalInfo.specialtyPhone && <p>Tel: {hospitalInfo.specialtyPhone}</p>}
                  <p>Tel: {hospitalInfo.mainPhone}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <CalendarDays className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">진료 시간</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <p>
                    평일: {hospitalInfo.weekdayOpen} - {hospitalInfo.weekdayClose}
                  </p>
                  {hospitalInfo.saturdayOpen && hospitalInfo.saturdayClose && (
                    <p>
                      토요일: {hospitalInfo.saturdayOpen} - {hospitalInfo.saturdayClose}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">진료 안내</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <p>
                    점심시간: {hospitalInfo.lunchStart} - {hospitalInfo.lunchEnd}
                  </p>
                  <p className="text-red-600">{hospitalInfo.closedDays} 휴진</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4 pt-4 border-t">
              <p className="text-gray-600 text-center">
                온라인으로 간편하게 예약하실 수 있습니다.
                <br />
                예약 시 환자 정보와 희망 진료 시간을 입력해 주세요.
              </p>
              <Button size="lg" className="px-8" onClick={() => setIsOpen(true)}>
                예약하기
              </Button>
              <ReservationDialog open={isOpen} onOpenChange={setIsOpen} />
            </div>
          </Card>
        </div>

        <div className="mt-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">오시는 길</h2>
            <div className="space-y-4">
              <KakaoMap />
              <div className="text-gray-600">
                {hospitalInfo.parkingInfo && <p>주차: {hospitalInfo.parkingInfo}</p>}
                {hospitalInfo.specialtyPhone && <p>전화: {hospitalInfo.specialtyPhone}</p>}
                <p>전화: {hospitalInfo.mainPhone}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
