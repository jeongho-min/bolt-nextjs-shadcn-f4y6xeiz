"use client";

import { ReservationStatus } from "@prisma/client";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReservationWithDetails } from "../types";
import { SetStateAction } from "react";

interface ReservationCardsProps {
  reservations: ReservationWithDetails[];
  onStatusChange: (id: string, status: ReservationStatus) => void;
  onSelect: (reservation: ReservationWithDetails) => void;
  statusOptions: { label: string; value: string }[];
}

export function ReservationCards({ reservations, onStatusChange, onSelect, statusOptions }: ReservationCardsProps) {
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

  return (
    <div className="grid gap-4">
      {reservations.map((reservation) => (
        <Card key={reservation.id} className="cursor-pointer hover:bg-muted/50" onClick={() => onSelect(reservation)}>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{reservation.user ? reservation.user.name : reservation.patientName}</span>
                    {reservation.isNonMember && <Badge variant="secondary">비회원</Badge>}
                  </div>
                  <div className="text-sm text-muted-foreground">{reservation.phone}</div>
                </div>
                <Select
                  value={reservation.status}
                  onValueChange={(value) => {
                    onStatusChange(reservation.id, value as ReservationStatus);
                  }}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue>
                      <Badge variant={getStatusBadgeVariant(reservation.status)}>
                        {statusOptions.find((option) => option.value === reservation.status)?.label}
                      </Badge>
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
              </div>
              <div className="grid gap-2">
                {reservation.doctor ? (
                  <div>
                    <div className="font-medium">{reservation.doctor.department.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {reservation.doctor.name} {reservation.doctor.position}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="font-medium text-muted-foreground">정보 없음</div>
                  </div>
                )}
                <div>
                  <div>{format(new Date(reservation.reservationDate), "PPP", { locale: ko })}</div>
                  <div className="text-sm text-muted-foreground">{reservation.timeSlot}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
