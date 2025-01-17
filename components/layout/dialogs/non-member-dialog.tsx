"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface NonMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (phone: string) => void;
}

export function NonMemberDialog({ open, onOpenChange, onSuccess }: NonMemberDialogProps) {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: API 호출로 변경
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onOpenChange(false);
      onSuccess(phone);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "조회 실패",
        description: "예약 내역을 찾을 수 없습니다. 전화번호를 다시 확인해주세요.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>비회원 예약 조회</DialogTitle>
          <DialogDescription>예약 시 입력하신 전화번호로 예약 내역을 조회할 수 있습니다.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="phone">전화번호</Label>
            <Input id="phone" type="tel" value={phone} onChange={handlePhoneChange} placeholder="010-0000-0000" maxLength={13} required />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "조회중..." : "예약 조회하기"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
