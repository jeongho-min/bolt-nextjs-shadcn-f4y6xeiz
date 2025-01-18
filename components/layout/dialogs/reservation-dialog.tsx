"use client";

import { useAuth } from "@/app/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Department, Doctor } from "@prisma/client";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useState, useEffect } from "react";

type DoctorWithDepartment = Doctor & {
  department: Department;
};

interface ReservationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReservationDialog({ open, onOpenChange }: ReservationDialogProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<DoctorWithDepartment[]>([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedDate] = useState<Date>(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });
  const [selectedTime] = useState("00:00");
  const [symptoms, setSymptoms] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 진료과 목록 가져오기
  useEffect(() => {
    if (open) {
      fetchDepartments();
    }
  }, [open]);

  // 선택된 진료과의 의사 목록 가져오기
  useEffect(() => {
    if (selectedDepartmentId) {
      fetchDoctors(selectedDepartmentId);
    }
  }, [selectedDepartmentId]);

  const fetchDepartments = async () => {
    try {
      const response = await fetch("/api/departments");
      if (!response.ok) throw new Error("진료과 정보를 불러오는데 실패했습니다.");
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

  const handleSubmit = async () => {
    if (!selectedDoctorId || !selectedDate || !selectedTime || !symptoms) {
      toast({
        variant: "destructive",
        title: "입력 오류",
        description: "모든 필수 정보를 입력해주세요.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId: selectedDoctorId,
          departmentId: selectedDepartmentId,
          reservationDate: selectedDate.toISOString(),
          timeSlot: selectedTime,
          symptoms,
          patientName: user?.name,
          phone: user?.phone,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "예약에 실패했습니다.");
      }

      toast({
        title: "예약 완료",
        description: `${format(selectedDate, "PPP", { locale: ko })} ${selectedTime}에 예약이 완료되었습니다.`,
      });

      onOpenChange(false);
      resetForm();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "예약 실패",
        description: error instanceof Error ? error.message : "예약 중 오류가 발생했습니다.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedDepartmentId("");
    setSelectedDoctorId("");
    setSymptoms("");
  };

  const isDisabledDay = (date: Date) => {
    const day = date.getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || day === 0; // 일요일 제외
  };

  const renderStepContent = () => {
    switch (step) {
      case 1: // 진료과/의사 선택
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>진료과 선택</Label>
              <Select value={selectedDepartmentId} onValueChange={setSelectedDepartmentId}>
                <SelectTrigger>
                  <SelectValue placeholder="진료과를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
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
              <Label>증상</Label>
              <Textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="증상을 자세히 설명해주세요" className="min-h-[100px]" />
            </div>

            <Button className="w-full" onClick={() => setStep(3)} disabled={!selectedDoctorId || !symptoms}>
              다음
            </Button>
          </div>
        );

      case 2: // 날짜 선택 - 제거
        return null;

      case 3: // 예약 확인
        const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId);
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">진료과</span>
                <span>{selectedDoctor?.department.name}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">담당의</span>
                <span>
                  {selectedDoctor?.name} {selectedDoctor?.position}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">예약일</span>
                <span>{selectedDate && format(selectedDate, "PPP", { locale: ko })}</span>
              </div>
              <div className="border-t pt-2">
                <span className="text-muted-foreground">증상</span>
                <p className="mt-1 text-sm">{symptoms}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                이전
              </Button>
              <Button className="flex-1" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "예약중..." : "예약하기"}
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>진료 예약</DialogTitle>
          <DialogDescription>{step === 1 ? "진료과와 담당의를 선택해주세요" : "예약 내용을 확인해주세요"}</DialogDescription>
        </DialogHeader>
        <div className="mt-4">{renderStepContent()}</div>
      </DialogContent>
    </Dialog>
  );
}
