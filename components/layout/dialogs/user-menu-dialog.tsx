"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { EditProfileDialog } from "./edit-profile-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/auth-provider";

interface UserMenuDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserMenuDialog({ open, onOpenChange }: UserMenuDialogProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { signOut } = useAuth();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty("--removed-body-scroll-bar-size", `${scrollBarWidth}px`);

    if (open) {
      document.documentElement.classList.add("dialog-open");
      document.body.classList.add("dialog-open");
    } else {
      document.documentElement.classList.remove("dialog-open");
      document.body.classList.remove("dialog-open");
    }
  }, [open]);

  const handleEditProfile = () => {
    onOpenChange(false);
    setShowEditProfile(true);
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("/api/users/me", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("회원탈퇴 처리 중 오류가 발생했습니다.");
      }

      toast({
        title: "회원탈퇴 완료",
        description: "회원탈퇴가 성공적으로 처리되었습니다.",
      });

      await signOut();
      router.push("/");
    } catch (error) {
      toast({
        title: "회원탈퇴 실패",
        description: error instanceof Error ? error.message : "회원탈퇴 처리 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
    setShowDeleteConfirm(false);
    onOpenChange(false);
  };

  return (
    <>
      <EditProfileDialog open={showEditProfile} onOpenChange={setShowEditProfile} />

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>회원탈퇴</AlertDialogTitle>
            <AlertDialogDescription>
              정말로 회원탈퇴를 진행하시겠습니까? 이 작업은 되돌릴 수 없으며, 모든 데이터가 영구적으로 삭제됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              회원탈퇴
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px] p-0 gap-0">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
              <User2 className="h-5 w-5" />
              사용자 메뉴
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-2">
            <div className="text-sm text-gray-500 mb-4">계정 관리와 관련된 작업을 수행할 수 있습니다.</div>
            <div className="grid gap-2">
              <button
                onClick={handleEditProfile}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all group"
              >
                <div className="p-2 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                  <Pencil className="h-4 w-4" />
                </div>
                <div className="flex flex-col items-start">
                  <span>정보수정</span>
                  <span className="text-xs text-gray-500">개인정보와 계정 설정을 변경합니다</span>
                </div>
              </button>
              <button
                onClick={() => {
                  onOpenChange(false);
                  setShowDeleteConfirm(true);
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all group"
              >
                <div className="p-2 rounded-full bg-red-100 group-hover:bg-red-200 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </div>
                <div className="flex flex-col items-start">
                  <span>회원탈퇴</span>
                  <span className="text-xs text-red-500">계정을 영구적으로 삭제합니다</span>
                </div>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
