"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { User2, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditProfileDialog({ open, onOpenChange }: EditProfileDialogProps) {
  const { toast } = useToast();
  const { data: session, update: updateSession } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty("--removed-body-scroll-bar-size", `${scrollBarWidth}px`);

    if (open) {
      document.documentElement.classList.add("dialog-open");
      document.body.classList.add("dialog-open");
      // 세션에서 사용자 정보 가져오기
      if (session?.user) {
        setFormData({
          name: session.user.name || "",
          email: session.user.email || "",
          phone: session.user.phone || "",
        });
      }
    } else {
      document.documentElement.classList.remove("dialog-open");
      document.body.classList.remove("dialog-open");
    }
  }, [open, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const updatedUser = await response.json();

      // 세션 업데이트
      await updateSession({
        ...session,
        user: {
          ...session?.user,
          ...updatedUser,
        },
      });

      toast({
        title: "정보 수정 완료",
        description: "사용자 정보가 성공적으로 수정되었습니다.",
      });
      onOpenChange(false);
    } catch (error) {
      console.error("[PROFILE_UPDATE_ERROR]", error);
      toast({
        variant: "destructive",
        title: "오류 발생",
        description: error instanceof Error ? error.message : "정보 수정 중 오류가 발생했습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <User2 className="h-5 w-5" />
            정보수정
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User2 className="h-4 w-4" />
                이름
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="이름을 입력하세요"
                disabled={isLoading}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                이메일
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="이메일을 입력하세요"
                disabled={true}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                전화번호
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="전화번호를 입력하세요"
                disabled={isLoading}
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)} disabled={isLoading}>
              취소
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "저장 중..." : "저장"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
