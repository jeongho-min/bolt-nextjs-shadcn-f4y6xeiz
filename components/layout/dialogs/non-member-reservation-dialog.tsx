"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { PhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";

interface NonMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (phone: string) => void;
}

export function NonMemberDialog({ open, onOpenChange, onSuccess }: NonMemberDialogProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!name || !phone || !password || !symptoms) {
      toast({
        variant: "destructive",
        title: "입력 오류",
        description: "모든 필수 정보를 입력해주세요.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const response = await fetch("/api/reservations/non-member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          reservationPassword: password,
          symptoms,
          reservationDate: today.toISOString(),
          timeSlot: "00:00",
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "예약에 실패했습니다.");
      }

      toast({
        title: "예약 완료",
        description: "예약이 완료되었습니다. 입력하신 전화번호와 비밀번호로 예약 조회가 가능합니다.",
      });

      onOpenChange(false);
      resetForm();
      onSuccess?.(phone);
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
    setName("");
    setPhone("");
    setPassword("");
    setSymptoms("");
  };

  const renderStepContent = () => {
    switch (step) {
      case 1: // 전화번호와 비밀번호 입력
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>이름</Label>
              <Input placeholder="이름을 입력하세요" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>전화번호</Label>
              <PhoneInput id="phone" placeholder="010-0000-0000" value={phone} onChange={setPhone} />
            </div>

            <div className="space-y-2">
              <Label>비밀번호</Label>
              <Input type="password" placeholder="예약 조회시 사용할 비밀번호를 입력하세요" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <Button className="w-full" onClick={() => setStep(2)} disabled={!name || !phone || !password}>
              다음
            </Button>
          </div>
        );

      case 2: // 증상 입력
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>증상</Label>
              <Textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="증상을 자세히 설명해주세요" className="min-h-[100px]" />
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>비회원 예약</DialogTitle>
          <DialogDescription>{step === 1 ? "전화번호와 비밀번호를 입력해주세요" : "증상을 입력해주세요"}</DialogDescription>
        </DialogHeader>
        <div className="mt-4">{renderStepContent()}</div>
      </DialogContent>
    </Dialog>
  );
}
