"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";

interface ReservationHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Reservation {
  id: string;
  reservationDate: string;
  timeSlot: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  symptoms: string;
  doctor: {
    name: string;
    position: string;
    department: {
      name: string;
    };
  };
}

export function ReservationHistoryDialog({ open, onOpenChange }: ReservationHistoryDialogProps) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState<string | null>(null);
  const [cancelReservationId, setCancelReservationId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      fetchReservations();
    }
  }, [open]);

  const fetchReservations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/reservations/search");
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "예약 내역을 불러오는데 실패했습니다.");
      }
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "오류",
        description: error instanceof Error ? error.message : "예약 내역을 불러오는데 실패했습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: Reservation["status"]) => {
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

  const handleCancelClick = (reservationId: string) => {
    setCancelReservationId(reservationId);
  };

  const handleCancelConfirm = async () => {
    if (!cancelReservationId) return;

    setIsCancelling(cancelReservationId);
    try {
      const response = await fetch(`/api/reservations/${cancelReservationId}/cancel`, {
        method: "PATCH",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "예약 취소에 실패했습니다.");
      }

      toast({
        title: "예약 취소 완료",
        description: "예약이 취소되었습니다.",
      });

      fetchReservations();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "예약 취소 실패",
        description: error instanceof Error ? error.message : "예약 취소 중 오류가 발생했습니다.",
      });
    } finally {
      setIsCancelling(null);
      setCancelReservationId(null);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] h-[600px] flex flex-col">
          <DialogHeader className="flex-none">
            <DialogTitle>예약 내역</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto pr-2 min-h-0">
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
            ) : reservations.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-center text-muted-foreground">예약 내역이 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-2 py-2">
                {reservations.map((reservation) => (
                  <div key={reservation.id} className="border rounded-lg p-2 hover:shadow-sm transition-shadow bg-white relative overflow-hidden group">
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
                          <h3 className="font-medium text-sm truncate">{reservation.doctor.department.name}</h3>
                          {getStatusBadge(reservation.status)}
                        </div>
                        {reservation.status !== "cancelled" && reservation.status !== "completed" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleCancelClick(reservation.id)}
                            disabled={isCancelling === reservation.id}
                          >
                            {isCancelling === reservation.id ? "취소중..." : "예약취소"}
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {reservation.doctor.name} {reservation.doctor.position} ·{" "}
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
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!cancelReservationId} onOpenChange={(open) => !open && setCancelReservationId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>예약 취소</AlertDialogTitle>
            <AlertDialogDescription>예약을 취소하시겠습니까? 이 작업은 되돌릴 수 없습니다.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelConfirm} className="bg-destructive hover:bg-destructive/90">
              예약취소
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
