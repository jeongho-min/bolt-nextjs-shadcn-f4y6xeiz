"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { PhoneInput } from "@/components/ui/phone-input";

interface NonMemberHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface NonMemberReservation {
  id: string;
  patientName: string;
  phone: string;
  reservationDate: string;
  timeSlot: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  symptoms: string;
}

export function NonMemberHistoryDialog({ open, onOpenChange }: NonMemberHistoryDialogProps) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reservations, setReservations] = useState<NonMemberReservation[]>([]);
  const [isSearched, setIsSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!phone || !password) {
      toast({
        variant: "destructive",
        title: "입력 오류",
        description: "전화번호와 비밀번호를 모두 입력해주세요.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/reservations/search?phone=${encodeURIComponent(phone)}&password=${encodeURIComponent(password)}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "예약 내역을 불러오는데 실패했습니다.");
      }
      const data = await response.json();
      setReservations(data);
      setIsSearched(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "조회 실패",
        description: error instanceof Error ? error.message : "예약 내역을 불러오는데 실패했습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: NonMemberReservation["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">대기중</Badge>;
      case "confirmed":
        return <Badge variant="default">예약확정</Badge>;
      case "completed":
        return <Badge variant="outline">진료완료</Badge>;
      case "cancelled":
        return <Badge variant="destructive">취소됨</Badge>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] flex flex-col transition-all duration-300">
        <DialogHeader className="flex-none">
          <DialogTitle>비회원 예약 조회</DialogTitle>
          <DialogDescription>전화번호와 예약 시 입력한 비밀번호를 입력해주세요.</DialogDescription>
        </DialogHeader>
        <div className="flex-none space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>전화번호</Label>
              <PhoneInput placeholder="010-0000-0000" value={phone} onChange={setPhone} />
            </div>
            <div className="space-y-2">
              <Label>비밀번호</Label>
              <Input type="password" placeholder="예약 비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={handleSearch} disabled={isLoading}>
            {isLoading ? "조회중..." : "조회하기"}
          </Button>
        </div>
        <div className={cn("overflow-y-auto transition-all duration-300", isSearched ? "max-h-[400px]" : "max-h-0")}>
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col space-y-2 border rounded-lg p-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-5 w-[60px]" />
                  </div>
                  <Skeleton className="h-3 w-[150px]" />
                  <Skeleton className="h-3 w-[120px]" />
                </div>
              ))}
            </div>
          ) : isSearched && reservations.length === 0 ? (
            <div className="h-full flex items-center justify-center py-8">
              <p className="text-center text-muted-foreground">예약 내역이 없습니다.</p>
            </div>
          ) : isSearched ? (
            <div className="space-y-2">
              {reservations.map((reservation) => (
                <div key={reservation.id} className="border rounded-lg p-2 hover:shadow-sm transition-shadow bg-white relative overflow-hidden">
                  <div
                    className={cn("absolute top-0 left-0 w-0.5 h-full opacity-75", {
                      "bg-primary": reservation.status === "confirmed",
                      "bg-secondary": reservation.status === "pending",
                      "bg-muted": reservation.status === "completed",
                      "bg-destructive": reservation.status === "cancelled",
                    })}
                  />
                  <div className="pl-2">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <h3 className="font-medium text-sm">{reservation.patientName}</h3>
                        {getStatusBadge(reservation.status)}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <span
                        className={cn("font-medium", {
                          "text-primary": reservation.status === "confirmed",
                          "text-secondary": reservation.status === "pending",
                          "text-muted-foreground": reservation.status === "completed",
                          "text-destructive": reservation.status === "cancelled",
                        })}
                      >
                        {format(new Date(reservation.reservationDate), "PPP", { locale: ko })} {reservation.timeSlot}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{reservation.symptoms}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
