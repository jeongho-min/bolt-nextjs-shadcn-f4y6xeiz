"use client";

import { useAuth } from "@/app/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { signIn } from "next-auth/react";

interface ReservationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showNonMemberDialog: () => void;
  nonMemberPhone: string | null;
  sampleReservations: any[];
}

function ReservationActions({ onEdit, onCancel }: { onEdit: () => void; onCancel: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit} className="text-blue-600">
          <Pencil className="mr-2 h-4 w-4" />
          수정하기
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onCancel} className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          예약취소
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ReservationDialog({ open, onOpenChange, showNonMemberDialog, nonMemberPhone, sampleReservations }: ReservationDialogProps) {
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "예약확정":
        return "text-blue-600";
      case "대기중":
        return "text-yellow-600";
      case "진료완료":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  const handleReservationEdit = (reservation: any) => {
    toast({
      title: "준비 중인 기능입니다",
      description: "곧 예약 수정 기능이 제공될 예정입니다.",
    });
  };

  const handleReservationCancel = (reservation: any) => {
    toast({
      title: "예약이 취소되었습니다",
      description: `${format(reservation.date, "M월 d일 HH:mm")} 예약이 취소되었습니다.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">예약 내역</DialogTitle>
          {nonMemberPhone && !isAuthenticated && <DialogDescription className="text-center">{nonMemberPhone} 님의 예약 내역입니다.</DialogDescription>}
          {isAuthenticated && user?.name && <DialogDescription className="text-center">{user.name} 님의 예약 내역입니다.</DialogDescription>}
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {isAuthenticated ? (
            <>
              {sampleReservations.length > 0 ? (
                <>
                  {sampleReservations
                    .filter((r) => {
                      return r.patientName === user?.name;
                    })
                    .map((reservation) => (
                      <div key={reservation.id} className="flex justify-between items-start p-4 bg-gray-100 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{format(reservation.date, "M월 d일 (EEE) HH:mm", { locale: ko })}</p>
                          <p className="text-sm text-gray-600 mt-0.5">{reservation.department}</p>
                          <p className="text-sm text-gray-600 mt-0.5">증상: {reservation.symptoms}</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className={`text-sm font-medium ${getStatusColor(reservation.status)}`}>{reservation.status}</span>
                          <ReservationActions onEdit={() => handleReservationEdit(reservation)} onCancel={() => handleReservationCancel(reservation)} />
                        </div>
                      </div>
                    ))}
                </>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-gray-500">예약 내역이 없습니다.</p>
                </div>
              )}
            </>
          ) : (
            <div className="py-8 text-center space-y-4">
              <p className="text-gray-500">로그인하고 예약 내역을 확인하세요.</p>
              <div className="flex flex-col gap-2">
                <button onClick={handleNaverLogin} className="w-full">
                  <div className="w-full h-[45px] bg-[#03C75A] rounded-lg  transition-colors flex items-center justify-center">
                    <Image src="/btnG_완성형.png" alt="네이버 로그인" width={300} height={45} className="h-[45px] object-contain" />
                  </div>
                </button>
                <button onClick={handleKakaoLogin} className="w-full">
                  <Image
                    src="/kakao_login_medium_wide.png"
                    alt="카카오 로그인"
                    width={300}
                    height={45}
                    className="w-full h-[45px] object-contain bg-[#FEE500] rounded-lg hover:bg-[#FEE500]/90 transition-colors"
                  />
                </button>
                <Button
                  variant="outline"
                  onClick={() => {
                    onOpenChange(false);
                    showNonMemberDialog();
                  }}
                >
                  비회원 예약 조회
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
