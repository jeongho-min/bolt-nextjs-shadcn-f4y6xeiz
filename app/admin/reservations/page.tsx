"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ReservationStatus } from "@prisma/client";
import { PageLayout } from "../components/page-layout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { ReservationTable } from "./components/reservation-table";
import { ReservationCards } from "./components/reservation-cards";
import { ReservationWithDetails } from "./types";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<ReservationWithDetails[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<ReservationWithDetails[]>([]);
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingMemo, setEditingMemo] = useState<{ id: string; memo: string } | null>(null);
  const [selectedReservation, setSelectedReservation] = useState<ReservationWithDetails | null>(null);
  const [viewType, setViewType] = useState<"table" | "grid">("table");
  const router = useRouter();
  const { toast } = useToast();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setViewType(isDesktop ? "table" : "grid");
  }, [isDesktop]);

  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    filterReservations();
  }, [statusFilter, searchQuery, reservations]);

  const filterReservations = () => {
    let filtered = [...reservations];

    if (statusFilter !== "ALL") {
      filtered = filtered.filter((reservation) => reservation.status === statusFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((reservation) => {
        const userName = (reservation.user?.name || reservation.patientName || "").toLowerCase();
        const userEmail = (reservation.user?.email || "").toLowerCase();
        return userName.includes(query) || userEmail.includes(query);
      });
    }

    setFilteredReservations(filtered);
  };

  const fetchReservations = async () => {
    try {
      const response = await fetch("/api/admin/reservations");
      const data = await response.json();
      setReservations(data);
      setFilteredReservations(data);
    } catch (error) {
      toast({
        title: "예약 정보 로딩 실패",
        description: "예약 정보를 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleStatusChange = async (id: string, newStatus: ReservationStatus) => {
    try {
      const reservation = reservations.find((r) => r.id === id);
      const isNonMember = !reservation?.userId;
      const endpoint = isNonMember ? `/api/reservations/non-member/${id}` : `/api/admin/reservations/${id}`;

      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchReservations();
        toast({
          title: "상태 변경 성공",
          description: "예약 상태가 성공적으로 변경되었습니다.",
        });
      } else {
        const error = await response.text();
        throw new Error(error);
      }
    } catch (error) {
      toast({
        title: "상태 변경 실패",
        description: error instanceof Error ? error.message : "예약 상태 변경에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadgeVariant = (status: ReservationStatus) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "confirmed":
        return "default";
      case "completed":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const statusOptions = [
    { label: "전체", value: "ALL" },
    { label: "대기중", value: "pending" },
    { label: "확정", value: "confirmed" },
    { label: "완료", value: "completed" },
    { label: "취소", value: "cancelled" },
  ];

  const handleMemoChange = async () => {
    if (!editingMemo) return;

    try {
      const reservation = reservations.find((r) => r.id === editingMemo.id);
      const isNonMember = !reservation?.userId;
      const endpoint = isNonMember ? `/api/reservations/non-member/${editingMemo.id}` : `/api/admin/reservations/${editingMemo.id}`;

      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ memo: editingMemo.memo }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      fetchReservations();
      setEditingMemo(null);
      toast({
        title: "메모 수정 성공",
        description: "예약 메모가 성공적으로 수정되었습니다.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "메모 수정 실패",
        description: error instanceof Error ? error.message : "메모 수정에 실패했습니다.",
      });
    }
  };

  const handleDetailMemoChange = async () => {
    if (!selectedReservation) return;

    try {
      const isNonMember = !selectedReservation.userId;
      const endpoint = isNonMember ? `/api/reservations/non-member/${selectedReservation.id}` : `/api/admin/reservations/${selectedReservation.id}`;

      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ memo: selectedReservation.memo }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      fetchReservations();
      toast({
        title: "메모 수정 성공",
        description: "예약 메모가 성공적으로 수정되었습니다.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "메모 수정 실패",
        description: error instanceof Error ? error.message : "메모 수정에 실패했습니다.",
      });
    }
  };

  const handleSelect = (reservation: ReservationWithDetails) => {
    setSelectedReservation(reservation);
  };

  const HeaderContent = () => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="relative w-[300px]">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="이름 또는 이메일로 검색" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">상태 필터:</span>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ReservationStatus | "ALL")}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        {statusOptions.slice(1).map((option) => (
          <Badge key={option.value} variant={getStatusBadgeVariant(option.value as ReservationStatus)}>
            {option.label}: {reservations.filter((r) => r.status === option.value).length}
          </Badge>
        ))}
      </div>
    </div>
  );

  return (
    <PageLayout
      title="예약 관리"
      backUrl="/admin"
      headerContent={<HeaderContent />}
      viewOptions={{
        isDesktop,
        viewType,
        onViewChange: setViewType,
      }}
    >
      {viewType === "table" && isDesktop ? (
        <ReservationTable reservations={filteredReservations} onStatusChange={handleStatusChange} onSelect={handleSelect} statusOptions={statusOptions} />
      ) : (
        <ReservationCards reservations={filteredReservations} onStatusChange={handleStatusChange} onSelect={handleSelect} statusOptions={statusOptions} />
      )}

      <Dialog open={!!editingMemo} onOpenChange={(open) => !open && setEditingMemo(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader className="px-6">
            <DialogTitle>메모 수정</DialogTitle>
            <DialogDescription>예약에 대한 메모를 입력해주세요.</DialogDescription>
          </DialogHeader>
          <div className="py-4 px-6 ">
            <Textarea
              value={editingMemo?.memo || ""}
              onChange={(e) => setEditingMemo((prev) => (prev ? { ...prev, memo: e.target.value } : null))}
              placeholder="메모를 입력하세요"
              className="min-h-[300px] resize-none overflow-y-auto whitespace-pre-wrap break-words"
            />
          </div>
          <DialogFooter className="px-6">
            <Button variant="outline" onClick={() => setEditingMemo(null)}>
              취소
            </Button>
            <Button onClick={handleMemoChange}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedReservation} onOpenChange={(open) => !open && setSelectedReservation(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle>예약 상세 정보</DialogTitle>
          </DialogHeader>
          {selectedReservation && (
            <>
              <div className="overflow-y-auto px-6">
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-1.5">예약자 정보</h3>
                      <div className="space-y-1">
                        <p>이름: {selectedReservation.user ? selectedReservation.user.name : selectedReservation.patientName}</p>
                        <p>연락처: {selectedReservation.phone}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1.5">진료 정보</h3>
                      <div className="space-y-1">
                        {selectedReservation.doctor ? (
                          <>
                            <p>진료과: {selectedReservation.doctor.department.name}</p>
                            <p>
                              담당의: {selectedReservation.doctor.name} {selectedReservation.doctor.position}
                            </p>
                          </>
                        ) : (
                          <p className="text-muted-foreground">정보 없음</p>
                        )}
                        <p>예약일: {format(new Date(selectedReservation.reservationDate), "PPP", { locale: ko })}</p>
                        <p>시간: {selectedReservation.timeSlot}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1.5">증상</h3>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="whitespace-pre-wrap">{selectedReservation.symptoms || "-"}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1.5">메모</h3>
                    <div>
                      <Textarea
                        value={selectedReservation.memo || ""}
                        onChange={(e) => setSelectedReservation({ ...selectedReservation, memo: e.target.value })}
                        placeholder="메모를 입력하세요"
                        className="min-h-[120px] resize-none overflow-y-auto whitespace-pre-wrap break-words"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="shrink-0 px-6 py-3 border-t bg-background mt-4">
                <div className="flex justify-end gap-2">
                  <Button onClick={handleDetailMemoChange} size="sm">
                    메모 저장
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedReservation(null)}>
                    닫기
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
