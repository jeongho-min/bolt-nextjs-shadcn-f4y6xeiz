"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ArrowUp, CalendarPlus, Copy, LucideIcon, MapPin, MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { ko } from "date-fns/locale";
import { initializeKakao, kakaoLogin, getCurrentUser, KakaoUserInfo } from "@/utils/kakao";
import { useKakao } from "@/app/providers/kakao-provider";

const HOSPITAL_NAME = "소리청일곡에스한방병원";
const HOSPITAL_LAT = 35.202698;
const HOSPITAL_LNG = 126.89739;
const KAKAO_MAPS_SEARCH_URL = `https://map.kakao.com/link/map/${HOSPITAL_NAME},${HOSPITAL_LAT},${HOSPITAL_LNG}`;
const KAKAO_MAPS_NAVI_URL = `kakaomap://route?ep=${HOSPITAL_LAT},${HOSPITAL_LNG}&by=CAR`;
const KAKAO_CHANNEL_ID = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID;
const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
const PHONE_NUMBER = "062-369-2075";

declare global {
  interface Window {
    Kakao: any;
  }
}

function PhoneDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(PHONE_NUMBER);
      alert("전화번호가 복사되었습니다.");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>전화 문의</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <p className="text-2xl font-bold text-primary">{PHONE_NUMBER}</p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={copyToClipboard}>
              <Copy className="w-4 h-4 mr-2" />
              복사하기
            </Button>
            <Button onClick={() => (window.location.href = `tel:${PHONE_NUMBER}`)}>
              <Phone className="w-4 h-4 mr-2" />
              전화걸기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ReservationDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { userInfo, updateLoginStatus } = useKakao();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 11) {
      let formattedNumber = "";
      if (value.length <= 3) {
        formattedNumber = value;
      } else if (value.length <= 7) {
        formattedNumber = `${value.slice(0, 3)}-${value.slice(3)}`;
      } else {
        formattedNumber = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`;
      }
      setPhone(formattedNumber);
    }
  };

  const handleKakaoLogin = async () => {
    try {
      const user = await kakaoLogin();
      await updateLoginStatus();
      setName(user.nickname);
      setStep(2);
    } catch (error) {
      console.error("Login Failed:", error);
      toast({
        variant: "destructive",
        title: "로그인 실패",
        description: "카카오 로그인 중 오류가 발생했습니다.",
      });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // TODO: API 호출로 변경
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "예약이 완료되었습니다",
        description: `${selectedDate?.toLocaleDateString("ko-KR")} ${selectedTime} 예약이 접수되었습니다.`,
        duration: 5000,
      });

      // 모든 입력 내용 초기화
      setStep(1);
      setName("");
      setPhone("");
      setSymptoms("");
      setSelectedDate(undefined);
      setSelectedTime("");
      setShowConfirmation(false);

      onOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "예약 실패",
        description: "예약 접수 중 오류가 발생했습니다. 다시 시도해주세요.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateTimeSlots = () => {
    if (!selectedDate) return [];
    const slots = [];
    const day = selectedDate.getDay();
    let start = 9;
    let end = 17.5;
    const lunchStart = 12.5;
    const lunchEnd = 14.5;

    if (day === 6) end = 13;

    for (let i = start; i <= end; i += 0.5) {
      if (i < lunchStart || i >= lunchEnd) {
        const hour = Math.floor(i);
        const minute = i % 1 === 0 ? "00" : "30";
        slots.push(`${hour.toString().padStart(2, "0")}:${minute}`);
      }
    }
    return slots;
  };

  const isDisabledDay = (date: Date) => {
    const day = date.getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || day === 0;
  };

  const renderConfirmationContent = () => {
    return (
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">예약자</span>
            <span className="font-medium">{name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">연락처</span>
            <span className="font-medium">{phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">예약일시</span>
            <span className="font-medium">
              {selectedDate?.toLocaleDateString("ko-KR")} {selectedTime}
            </span>
          </div>
          <div className="border-t pt-3">
            <span className="text-muted-foreground block mb-1">증상</span>
            <p className="text-sm whitespace-pre-wrap">{symptoms}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowConfirmation(false)} className="flex-1">
            수정하기
          </Button>
          <Button onClick={handleSubmit} className="flex-1" disabled={isSubmitting}>
            {isSubmitting ? "예약 접수 중..." : "예약하기"}
          </Button>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    if (showConfirmation) {
      return renderConfirmationContent();
    }

    switch (step) {
      case 1:
        return (
          <div className="flex flex-col gap-4">
            <Button onClick={() => setStep(2)} className="h-12 text-lg">
              직접 입력하기
            </Button>
            <Button onClick={handleKakaoLogin} className="h-12 text-lg bg-[#FEE500] hover:bg-[#FEE500]/90 text-black">
              카카오로 시작하기
            </Button>
          </div>
        );

      case 2:
        return (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setStep(3);
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="홍길동" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">연락처</Label>
              <Input id="phone" type="tel" value={phone} onChange={handlePhoneChange} placeholder="010-0000-0000" maxLength={13} required />
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                이전
              </Button>
              <Button type="submit" className="flex-1" disabled={!name || !phone}>
                다음
              </Button>
            </div>
          </form>
        );

      case 3:
        return (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setStep(4);
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="symptoms">증상</Label>
              <Textarea
                id="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="증상을 자세히 설명해주세요."
                className="min-h-[150px] resize-none"
                required
              />
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                이전
              </Button>
              <Button type="submit" className="flex-1" disabled={!symptoms}>
                다음
              </Button>
            </div>
          </form>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>예약 날짜 선택</Label>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={isDisabledDay}
                  className="rounded-md border"
                  fromDate={new Date()}
                  locale={ko}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(3)} className="flex-1">
                이전
              </Button>
              <Button onClick={() => setStep(5)} className="flex-1" disabled={!selectedDate}>
                다음
              </Button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>예약 시간 선택</Label>
              <div className="text-sm text-muted-foreground">
                {selectedDate?.getDay() === 6 ? "토요일: 09:00 - 13:00" : "평일: 09:00 - 17:30"}
                {selectedDate && " (점심시간 12:30 - 14:30 제외)"}
              </div>
              <div className="grid grid-cols-3 gap-2 max-h-[200px] overflow-y-auto p-1">
                {generateTimeSlots().map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => setSelectedTime(time)}
                    className="h-10"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(4)} className="flex-1">
                이전
              </Button>
              <Button onClick={() => setShowConfirmation(true)} className="flex-1" disabled={!selectedTime}>
                다음
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{showConfirmation ? "예약 확인" : "진료 예약"}</DialogTitle>
          <DialogDescription>
            {showConfirmation
              ? "예약 내용을 확인해주세요."
              : step === 1
              ? "예약 방식을 선택해주세요."
              : step === 2
              ? userInfo
                ? "예약을 위해 연락처를 입력해주세요."
                : "예약자 정보를 입력해주세요."
              : step === 3
              ? "증상을 설명해주세요."
              : step === 4
              ? "예약 날짜를 선택해주세요."
              : "예약 시간을 선택해주세요."}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">{renderStepContent()}</div>
      </DialogContent>
    </Dialog>
  );
}

function BusinessHours() {
  const [status, setStatus] = useState<"open" | "lunch" | "closed">("closed");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkBusinessHours = () => {
      const day = currentTime.getDay();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const currentMinutes = hours * 60 + minutes;

      // 일요일은 휴진
      if (day === 0) return "closed";

      // 점심시간 (12:30 - 14:30)
      const lunchStart = 12 * 60 + 30;
      const lunchEnd = 14 * 60 + 30;

      if (currentMinutes >= lunchStart && currentMinutes < lunchEnd) {
        return "lunch";
      }

      // 토요일
      if (day === 6) {
        return currentMinutes >= 9 * 60 && currentMinutes < 13 * 60 ? "open" : "closed";
      }

      // 평일
      return currentMinutes >= 9 * 60 && currentMinutes < 17 * 60 + 30 ? "open" : "closed";
    };

    setStatus(checkBusinessHours());
  }, [currentTime]);

  const statusConfig = {
    open: {
      color: "bg-green-500",
      text: "영업중",
      ringColor: "ring-green-500/30",
    },
    lunch: {
      color: "bg-yellow-500",
      text: "점심시간",
      ringColor: "ring-yellow-500/30",
    },
    closed: {
      color: "bg-red-500",
      text: "영업종료",
      ringColor: "ring-red-500/30",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div
          className={`
            bg-white shadow-lg border border-gray-200
            px-4 py-2 rounded-lg
            flex items-center gap-2
            ring-2 ${statusConfig[status].ringColor}
            cursor-help
          `}
        >
          <div className={`w-2.5 h-2.5 rounded-full ${statusConfig[status].color} animate-pulse`} />
          <span className="text-sm font-semibold text-gray-800">{statusConfig[status].text}</span>
        </div>

        {/* 호버 시 보이는 영업시간 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
            scale: isHovered ? 1 : 0.95,
          }}
          className={`
            absolute bottom-full right-0 mb-2
            bg-white shadow-lg border border-gray-200
            p-4 rounded-lg min-w-[200px]
            ${isHovered ? "pointer-events-auto" : "pointer-events-none"}
          `}
        >
          <div className="space-y-2 text-sm">
            <h3 className="font-semibold text-gray-800 border-b pb-2">진료시간 안내</h3>
            <div className="space-y-1.5">
              <p className="flex justify-between">
                <span className="text-gray-600">평일</span>
                <span className="font-medium">09:00 - 17:30</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">토요일</span>
                <span className="font-medium">09:00 - 13:00</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">점심시간</span>
                <span className="font-medium">12:30 - 14:30</span>
              </p>
              <p className="flex justify-between text-red-500 font-medium mt-2">
                <span>일요일/공휴일</span>
                <span>휴진</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

type QuickLink = {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  color: string;
  bgColor: string;
  hoverColor: string;
};

const QUICK_LINKS: QuickLink[] = [
  {
    icon: MapPin,
    label: "길찾기",
    onClick: () => {
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = KAKAO_MAPS_NAVI_URL;
      } else {
        window.open(KAKAO_MAPS_SEARCH_URL, "_blank");
      }
    },
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    hoverColor: "hover:bg-emerald-100",
  },
  {
    icon: CalendarPlus,
    label: "예약하기",
    onClick: undefined,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    hoverColor: "hover:bg-amber-100",
  },
  {
    icon: MessageCircle,
    label: "상담하기",
    onClick: () => {
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = `kakaoopen://plusfriend/home/@${KAKAO_CHANNEL_ID}`;
      } else {
        window.open(`https://pf.kakao.com/_${KAKAO_CHANNEL_ID}`, "_blank");
      }
    },
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    hoverColor: "hover:bg-blue-100",
  },
  {
    icon: Phone,
    label: "전화문의",
    onClick: undefined,
    color: "text-rose-500",
    bgColor: "bg-rose-50",
    hoverColor: "hover:bg-rose-100",
  },
  {
    icon: ArrowUp,
    label: "TOP",
    onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    color: "text-gray-500",
    bgColor: "bg-gray-50",
    hoverColor: "hover:bg-gray-100",
  },
];

export function QuickLinks() {
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [isReservationDialogOpen, setIsReservationDialogOpen] = useState(false);

  const handlePhoneClick = () => {
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = `tel:${PHONE_NUMBER}`;
    } else {
      setIsPhoneDialogOpen(true);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5"
      >
        {QUICK_LINKS.map((link) => {
          const IconComponent = link.icon;
          const content = (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} className="relative group">
              <div
                className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm transition-all duration-300 ease-out shadow-lg shadow-black/5 group-hover:shadow-xl group-hover:shadow-black/10 border border-gray-100`}
              >
                <IconComponent className={`w-5 h-5 ${link.color} transition-all duration-300 group-hover:scale-110 mb-0.5`} />
                <span className={`text-[10px] font-medium ${link.color}`}>{link.label}</span>
              </div>
            </motion.div>
          );

          if (link.label === "전화문의") {
            return (
              <button key={link.label} onClick={handlePhoneClick} className="focus:outline-none" aria-label={link.label}>
                {content}
              </button>
            );
          }

          if (link.label === "예약하기") {
            return (
              <button key={link.label} onClick={() => setIsReservationDialogOpen(true)} className="focus:outline-none" aria-label={link.label}>
                {content}
              </button>
            );
          }

          return link.onClick ? (
            <button key={link.label} onClick={link.onClick} className="focus:outline-none" aria-label={link.label}>
              {content}
            </button>
          ) : null;
        })}
      </motion.div>

      <PhoneDialog open={isPhoneDialogOpen} onOpenChange={setIsPhoneDialogOpen} />
      <ReservationDialog open={isReservationDialogOpen} onOpenChange={setIsReservationDialogOpen} />
      <BusinessHours />
    </>
  );
}
