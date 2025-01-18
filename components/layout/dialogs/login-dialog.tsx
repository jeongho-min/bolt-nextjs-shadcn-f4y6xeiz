"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import { useHandleOAuthError } from "@/lib/utils/handle-oauth-error";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const { toast } = useToast();
  useHandleOAuthError();

  const handleKakaoLogin = async () => {
    try {
      await signIn("kakao", { callbackUrl: "/" });
    } catch (error) {
      console.error("Login Failed:", error);
      toast({
        variant: "destructive",
        title: "로그인 실패",
        description: "카카오 로그인 중 오류가 발생했습니다.",
      });
    }
  };

  const handleNaverLogin = async () => {
    try {
      await signIn("naver", { callbackUrl: "/" });
    } catch (error) {
      console.error("Naver Login Failed:", error);
      toast({
        variant: "destructive",
        title: "로그인 실패",
        description: "네이버 로그인 중 오류가 발생했습니다.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">로그인</DialogTitle>
          <DialogDescription className="text-center">소셜 계정으로 간편하게 로그인하세요</DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
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
      </DialogContent>
    </Dialog>
  );
}
