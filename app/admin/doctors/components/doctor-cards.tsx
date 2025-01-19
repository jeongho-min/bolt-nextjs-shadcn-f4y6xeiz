"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { Doctor, Department } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
import Image from "next/image";
import { StatusButton } from "../../components/buttons";
import { useRouter } from "next/navigation";

type DoctorWithDepartment = Doctor & {
  department: Department;
};

interface DoctorCardsProps {
  doctors: DoctorWithDepartment[];
  onStatusToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => void;
}

export function DoctorCards({ doctors, onStatusToggle, onDelete }: DoctorCardsProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>, doctorId: string) => {
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    router.push(`/admin/doctors/${doctorId}`);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="cursor-pointer hover:bg-muted/50" onClick={(e) => handleCardClick(e, doctor.id)}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {doctor.imageUrl && (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image src={doctor.imageUrl} alt={doctor.name} fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">{doctor.department.name}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setDeleteId(doctor.id)} className="text-red-600">
                      삭제
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">직책</span>
                  <span>{doctor.position || "-"}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">전문분야</span>
                  <span>{doctor.specialties || "-"}</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-2">
                  <span className="text-muted-foreground">상태</span>
                  <StatusButton isActive={doctor.isActive} onClick={() => onStatusToggle(doctor.id)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>의사 삭제</AlertDialogTitle>
            <AlertDialogDescription>정말 이 의사를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteId) {
                  onDelete(deleteId);
                  setDeleteId(null);
                }
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
