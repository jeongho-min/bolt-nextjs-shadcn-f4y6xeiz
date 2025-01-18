"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { PhoneInput } from "@/components/ui/phone-input";

interface NonMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (phone: string) => void;
}

export function NonMemberDialog({ open, onOpenChange, onSuccess }: NonMemberDialogProps) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setPhone("");
      setPassword("");
      setConfirmPassword("");
    }
    onOpenChange(open);
  };

  const handleSubmit = async () => {
    if (!phone || !password || !confirmPassword) {
      toast({
        variant: "destructive",
        title: "입력 오류",
        description: "모든 필드를 입력해주세요.",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "비밀번호 불일치",
        description: "비밀번호가 일치하지 않습니다.",
      });
      return;
    }

    setIsLoading(true);
    try {
      onSuccess(phone);
      handleOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "오류",
        description: "처리 중 오류가 발생했습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>비회원 예약</DialogTitle>
          <DialogDescription>전화번호와 비밀번호를 입력해주세요.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="phone">전화번호</Label>
            <PhoneInput id="phone" placeholder="010-0000-0000" value={phone} onChange={setPhone} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input id="password" type="password" placeholder="예약 비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
          {isLoading ? "처리중..." : "확인"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
