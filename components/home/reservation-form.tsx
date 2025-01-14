"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ReservationFormProps {
  onClose: () => void;
}

export function ReservationForm({ onClose }: ReservationFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [step, setStep] = useState(1);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 11) {
      const formattedValue = value
        .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
        .replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3")
        .replace(/(\d{3})(\d{1,4})/, "$1-$2");
      setPhone(formattedValue);
    }
  };

  const handleSubmit = async () => {
    // 여기에 실제 제출 로직 구현
    console.log({ name, phone, symptoms, selectedDate, selectedTime });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onClose();
    setStep(1);
    // 폼 초기화
    setName("");
    setPhone("");
    setSymptoms("");
    setSelectedDate(undefined);
    setSelectedTime("");
  };

  const handleKakaoLogin = () => {
    // 카카오 로그인 처리
    console.log("카카오 로그인");
  };

  const generateTimeSlots = () => {
    const slots = [];
    const start = 9;
    const end = 17;
    const lunchStart = 12.5;
    const lunchEnd = 14.5;

    for (let i = start; i <= end; i += 0.5) {
      if (i < lunchStart || i >= lunchEnd) {
        const hour = Math.floor(i);
        const minute = i % 1 === 0 ? "00" : "30";
        slots.push(`${hour}:${minute}`);
      }
    }
    return slots;
  };

  return (
    <>
      {step === 1 ? (
        <div className="space-y-4 py-4">
          <Tabs defaultValue="direct" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="direct">직접 입력</TabsTrigger>
              <TabsTrigger value="kakao">카카오로 시작하기</TabsTrigger>
            </TabsList>
            <TabsContent value="direct" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름을 입력하세요" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">연락처</Label>
                  <Input id="phone" value={phone} onChange={handlePhoneChange} placeholder="전화번호를 입력하세요" />
                </div>
                <Button onClick={() => setStep(2)} className="w-full">
                  다음
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="kakao" className="space-y-4 pt-4">
              <Button onClick={handleKakaoLogin} className="w-full bg-[#FEE500] text-black hover:bg-[#FEE500]/90">
                카카오로 시작하기
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>예약 날짜</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}>
                  {selectedDate ? format(selectedDate, "PPP", { locale: ko }) : <span>날짜를 선택하세요</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} locale={ko} />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label>예약 시간</Label>
            <select className="w-full p-2 border rounded-md" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
              <option value="">시간을 선택하세요</option>
              {generateTimeSlots().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="symptoms">증상</Label>
            <Textarea id="symptoms" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="증상을 입력하세요" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(1)} className="w-full">
              이전
            </Button>
            <Button onClick={handleSubmit} className="w-full">
              예약하기
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
