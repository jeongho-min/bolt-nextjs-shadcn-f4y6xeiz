"use client";

import { useAuth } from "@/app/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ko } from "date-fns/locale";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Department, Doctor } from "@prisma/client";

type DoctorWithDepartment = Doctor & {
  department: Department;
};

interface ReservationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReservationDialog({ open, onOpenChange }: ReservationDialogProps) {
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [symptoms, setSymptoms] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [password, setPassword] = useState("");
  const [isDirectInput, setIsDirectInput] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<DoctorWithDepartment[]>([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>("");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("");

  useEffect(() => {
    if (open) {
      fetchDepartments();
    }
  }, [open]);

  useEffect(() => {
    if (selectedDepartmentId) {
      fetchDoctors(selectedDepartmentId);
    }
  }, [selectedDepartmentId]);

  const fetchDepartments = async () => {
    try {
      const response = await fetch("/api/departments");
      if (!response.ok) throw new Error("부서 정보를 불러오는데 실패했습니다.");
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "오류",
        description: "진료과 정보를 불러오는데 실패했습니다.",
      });
    }
  };

  const fetchDoctors = async (departmentId: string) => {
    try {
      const response = await fetch(`/api/departments/${departmentId}/doctors`);
      if (!response.ok) throw new Error("의사 정보를 불러오는데 실패했습니다.");
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "오류",
        description: "의사 정보를 불러오는데 실패했습니다.",
      });
    }
  };

  useEffect(() => {
    if (open && isAuthenticated) {
      setName(user?.name || "");
      setPhone(user?.phone || "");
      // 로그인한 유저이고 전화번호가 있으면 증상 입력 단계(3)로, 없으면 연락처 입력 단계(2)로
      setStep(user?.phone ? 3 : 2);
    } else {
      setStep(1);
    }
  }, [open, isAuthenticated, user]);

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

  const handleNaverLogin = async () => {
    try {
      const result = await signIn("naver", { redirect: false });
      if (result?.error) {
        throw new Error(result.error);
      }
      if (user) {
        setName(user.name || "");
        setPhone(user.phone || "");
        setStep(2);
      }
    } catch (error) {
      console.error("Naver Login Failed:", error);
      toast({
        variant: "destructive",
        title: "로그인 실패",
        description: "네이버 로그인 중 오류가 발생했습니다.",
      });
    }
  };

  const handleKakaoLogin = async () => {
    try {
      const result = await signIn("kakao", { redirect: false });
      if (result?.error) {
        throw new Error(result.error);
      }
      if (user) {
        setName(user.name || "");
        setPhone(user.phone || "");
        setStep(2);
      }
    } catch (error) {
      console.error("Kakao Login Failed:", error);
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
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientName: name,
          phone,
          doctorId: selectedDoctorId,
          departmentId: selectedDepartmentId,
          reservationDate: selectedDate?.toISOString(),
          timeSlot: selectedTime,
          symptoms,
          userId: user?.id,
          password: isDirectInput && !isAuthenticated ? password : undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

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
      setPassword("");
      setSelectedDepartmentId("");
      setSelectedDoctorId("");

      onOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "예약 실패",
        description: error instanceof Error ? error.message : "예약 접수 중 오류가 발생했습니다. 다시 시도해주세요.",
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
    const selectedDoctor = doctors.find((doctor) => doctor.id === selectedDoctorId);

    if (isDirectInput && !isAuthenticated) {
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
              <span className="text-muted-foreground">진료과/담당의</span>
              <span className="font-medium">
                {selectedDoctor?.department.name} / {selectedDoctor?.name} {selectedDoctor?.position}
              </span>
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
          <div className="space-y-2">
            <Label htmlFor="password">예약 비밀번호</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="예약 조회시 사용할 비밀번호를 입력하세요"
              required
            />
            <p className="text-sm text-muted-foreground">비회원 예약 조회시 필요한 비밀번호입니다.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowConfirmation(false)} className="flex-1">
              수정하기
            </Button>
            <Button onClick={handleSubmit} className="flex-1" disabled={isSubmitting || !password}>
              {isSubmitting ? "예약 접수 중..." : "예약하기"}
            </Button>
          </div>
        </div>
      );
    }

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
            <span className="text-muted-foreground">진료과/담당의</span>
            <span className="font-medium">
              {selectedDoctor?.department.name} / {selectedDoctor?.name} {selectedDoctor?.position}
            </span>
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
            <Button
              onClick={() => {
                setStep(2);
                setIsDirectInput(true);
              }}
              className="h-12 text-lg"
            >
              직접 입력하기
            </Button>
            <button onClick={handleNaverLogin} className="w-full">
              <div className="w-full h-[45px] bg-[#03C75A] rounded-lg transition-colors flex items-center justify-center">
                <Image src="/btnG_완성형.png" alt="네이버 로그인" width={300} height={45} className="h-[45px] object-contain" />
              </div>
            </button>
            <button onClick={handleKakaoLogin} className="w-full">
              <div className="w-full h-[45px] bg-[#FEE500] rounded-lg transition-colors flex items-center justify-center">
                <Image src="/kakao_login_medium_narrow.png" alt="카카오 로그인" width={300} height={45} className="h-[45px] object-contain" />
              </div>
            </button>
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
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="홍길동" required disabled={isAuthenticated} />
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
              <Label>진료과 선택</Label>
              <Select value={selectedDepartmentId} onValueChange={setSelectedDepartmentId}>
                <SelectTrigger>
                  <SelectValue placeholder="진료과를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((department) => (
                    <SelectItem key={department.id} value={department.id}>
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedDepartmentId && (
              <div className="space-y-2">
                <Label>담당의 선택</Label>
                <Select value={selectedDoctorId} onValueChange={setSelectedDoctorId}>
                  <SelectTrigger>
                    <SelectValue placeholder="담당의를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        {doctor.name} {doctor.position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

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
              <Button type="submit" className="flex-1" disabled={!symptoms || !selectedDoctorId}>
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
              ? isAuthenticated
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
