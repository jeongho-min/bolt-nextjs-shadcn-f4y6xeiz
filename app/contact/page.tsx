"use client";

import { ContactHero } from "./components/contact-hero";
import { InfoSection } from "./components/info-section";
import { Card } from "@/components/ui/card";
import { KakaoMap } from "@/components/map/kakao-map";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Phone } from "lucide-react";
import { useState } from "react";
import { ReservationDialog } from "@/components/home/reservation-dialog";

export default function ContactPage() {
  const [isOpen, setIsOpen] = useState(false);

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
                  <p>Tel: 062-369-2075 (이명치료)</p>
                  <p>Tel: 062-571-2222</p>
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
                  <p>평일: 09:00 - 17:30</p>
                  <p>토요일: 09:00 - 13:00</p>
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
                  <p>점심시간: 12:30 - 14:30</p>
                  <p className="text-red-600">일요일/공휴일 휴진</p>
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
                <p>주차: 병원 지하 1층과 병원 뒷쪽 공영주차장(진료시 주차비 지급)</p>
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
