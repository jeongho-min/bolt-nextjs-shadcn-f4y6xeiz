"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { EditProfileDialog } from "./edit-profile-dialog";

interface UserMenuDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserMenuDialog({ open, onOpenChange }: UserMenuDialogProps) {
  const { toast } = useToast();
  const [showEditProfile, setShowEditProfile] = useState(false);

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

  const handleDeleteAccount = () => {
    // TODO: 회원탈퇴 기능 구현
    toast({
      title: "준비 중",
      description: "회원탈퇴 기능은 현재 개발 중입니다.",
    });
    onOpenChange(false);
  };

  return (
    <>
      <EditProfileDialog open={showEditProfile} onOpenChange={setShowEditProfile} />

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
                onClick={handleDeleteAccount}
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
