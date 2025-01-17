"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Search } from "lucide-react";
import { Reservation, ReservationStatus, User, Doctor, Department } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

type ReservationWithDetails = Reservation & {
  user: User | null;
  doctor: Doctor & {
    department: Department;
  };
};

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<ReservationWithDetails[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<ReservationWithDetails[]>([]);
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingMemo, setEditingMemo] = useState<{ id: string; memo: string } | null>(null);
  const [selectedReservation, setSelectedReservation] = useState<ReservationWithDetails | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    filterReservations();
  }, [statusFilter, searchQuery, reservations]);

  const filterReservations = () => {
    let filtered = [...reservations];

    // 상태 필터 적용
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((reservation) => reservation.status === statusFilter);
    }

    // 검색어 필터 적용
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
      const response = await fetch(`/api/admin/reservations/${id}`, {
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

  const getStatusLabel = (status: ReservationStatus) => {
    switch (status) {
      case "pending":
        return "대기중";
      case "confirmed":
        return "확정";
      case "completed":
        return "완료";
      case "cancelled":
        return "취소";
      default:
        return status;
    }
  };

  const tableHeaders = [
    { label: "예약자", width: "w-[200px]" },
    { label: "진료과/의사", width: "w-[200px]" },
    { label: "예약일시", width: "w-[200px]" },
    { label: "증상", width: "w-[250px]" },
    { label: "상태", width: "w-[150px]" },
    { label: "메모", width: "w-[200px]" },
  ];

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
      const response = await fetch(`/api/admin/reservations/${editingMemo.id}`, {
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
      const response = await fetch(`/api/admin/reservations/${selectedReservation.id}`, {
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

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.push("/admin")} className="h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">예약 관리</h1>
        </div>
        <div className="flex items-center gap-4">
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
      </div>

      <div className="rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {tableHeaders.map((header, index) => (
                <TableHead key={index} className={cn(header.width, "py-5 px-6", "font-semibold")}>
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReservations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={tableHeaders.length} className="h-24 text-center">
                  검색 결과가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              filteredReservations.map((reservation) => (
                <TableRow key={reservation.id} className="hover:bg-muted/50 cursor-pointer" onClick={() => setSelectedReservation(reservation)}>
                  <TableCell className="py-5 px-6">
                    <div className="space-y-1">
                      <div className="font-medium">{reservation.user ? reservation.user.name : reservation.patientName}</div>
                      <div className="text-sm text-muted-foreground">{reservation.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell className="py-5 px-6">
                    <div className="space-y-1">
                      <div className="font-medium">{reservation.doctor.department.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {reservation.doctor.name} {reservation.doctor.position}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-5 px-6">
                    <div className="space-y-1">
                      <div className="font-medium">{format(new Date(reservation.reservationDate), "PPP", { locale: ko })}</div>
                      <div className="text-sm text-muted-foreground">{reservation.timeSlot}</div>
                    </div>
                  </TableCell>
                  <TableCell className="py-5 px-6 text-muted-foreground">
                    <div className="truncate max-w-[250px]">{reservation.symptoms}</div>
                  </TableCell>
                  <TableCell className="py-5 px-6" onClick={(e) => e.stopPropagation()}>
                    <Select value={reservation.status} onValueChange={(value) => handleStatusChange(reservation.id, value as ReservationStatus)}>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.slice(1).map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="py-5 px-6 text-muted-foreground" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-2">
                      <span className="truncate max-w-[150px]">{reservation.memo || "-"}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!editingMemo} onOpenChange={(open) => !open && setEditingMemo(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader className="px-6">
            <DialogTitle>메모 수정</DialogTitle>
            <DialogDescription>예약에 대한 메모를 입력해주세요.</DialogDescription>
          </DialogHeader>
          <div className="py-4 px-6">
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
        <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
          <DialogHeader className="px-6">
            <DialogTitle>예약 상세 정보</DialogTitle>
          </DialogHeader>
          {selectedReservation && (
            <div className="space-y-6 flex-1 overflow-y-auto px-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">예약자 정보</h3>
                  <div className="space-y-1">
                    <p>이름: {selectedReservation.user ? selectedReservation.user.name : selectedReservation.patientName}</p>
                    <p>연락처: {selectedReservation.phone}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">진료 정보</h3>
                  <div className="space-y-1">
                    <p>진료과: {selectedReservation.doctor.department.name}</p>
                    <p>
                      담당의: {selectedReservation.doctor.name} {selectedReservation.doctor.position}
                    </p>
                    <p>예약일: {format(new Date(selectedReservation.reservationDate), "PPP", { locale: ko })}</p>
                    <p>시간: {selectedReservation.timeSlot}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">증상</h3>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedReservation.symptoms || "-"}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">메모</h3>
                <div className="space-y-2">
                  <Textarea
                    value={selectedReservation.memo || ""}
                    onChange={(e) => setSelectedReservation({ ...selectedReservation, memo: e.target.value })}
                    placeholder="메모를 입력하세요"
                    className="min-h-[200px] resize-none overflow-y-auto whitespace-pre-wrap break-words"
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="mt-6 px-6">
            <div className="flex gap-2">
              <Button onClick={handleDetailMemoChange} size="sm">
                메모 저장
              </Button>
              <Button variant="outline" onClick={() => setSelectedReservation(null)}>
                닫기
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
