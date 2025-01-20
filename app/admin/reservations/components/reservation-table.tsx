"use client";

import { ReservationStatus } from "@prisma/client";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable, Column } from "@/components/ui/data-table";
import { ReservationWithDetails } from "../types";
import { SetStateAction } from "react";

interface ReservationTableProps {
  reservations: ReservationWithDetails[];
  onStatusChange: (id: string, status: ReservationStatus) => void;
  onSelect: (reservation: ReservationWithDetails) => void;
  statusOptions: { label: string; value: string }[];
}

export function ReservationTable({ reservations, onStatusChange, onSelect, statusOptions }: ReservationTableProps) {
  const columns: Column<ReservationWithDetails>[] = [
    {
      header: "예약자",
      cell: (reservation) => (
        <div>
          <div className="font-medium">
            {reservation.user ? reservation.user.name : reservation.patientName}
            {reservation.isNonMember && (
              <Badge variant="secondary" className="ml-2">
                비회원
              </Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground">{reservation.phone}</div>
        </div>
      ),
    },
    {
      header: "진료과/의사",
      cell: (reservation) => {
        if (!reservation.doctor) {
          return (
            <div>
              <div className="font-medium text-muted-foreground">정보 없음</div>
            </div>
          );
        }
        return (
          <div>
            <div className="font-medium">{reservation.doctor.department.name}</div>
            <div className="text-sm text-muted-foreground">
              {reservation.doctor.name} {reservation.doctor.position}
            </div>
          </div>
        );
      },
    },
    {
      header: "예약일시",
      cell: (reservation) => (
        <div>
          <div>{format(new Date(reservation.reservationDate), "PPP", { locale: ko })}</div>
          <div className="text-sm text-muted-foreground">{reservation.timeSlot}</div>
        </div>
      ),
    },
    {
      header: "상태",
      className: "w-[180px]",
      cell: (reservation) => (
        <Select value={reservation.status} onValueChange={(value) => onStatusChange(reservation.id, value as ReservationStatus)}>
          <SelectTrigger>
            <SelectValue>
              <Badge variant={getStatusBadgeVariant(reservation.status)}>{statusOptions.find((option) => option.value === reservation.status)?.label}</Badge>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {statusOptions.slice(1).map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <Badge variant={getStatusBadgeVariant(option.value as ReservationStatus)}>{option.label}</Badge>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ),
    },
  ];

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

  return <DataTable data={reservations} columns={columns} pageSize={10} onRowClick={onSelect} />;
}
