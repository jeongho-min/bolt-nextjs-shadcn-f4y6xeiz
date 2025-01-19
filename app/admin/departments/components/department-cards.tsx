"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical, MoreHorizontal } from "lucide-react";
import { Department, MedicalSubject } from "@prisma/client";
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
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface DepartmentWithSubjects extends Department {
  subjects: MedicalSubject[];
}

interface DepartmentCardsProps {
  departments: DepartmentWithSubjects[];
  onStatusToggle: (id: string, currentStatus: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAddSubjects: (id: string) => void;
}

export function DepartmentCards({ departments, onStatusToggle, onEdit, onDelete, onAddSubjects }: DepartmentCardsProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {departments.map((department) => (
          <Card key={department.id} className="bg-white rounded-lg border p-3 hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium truncate">{department.name}</h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{new Date(department.createdAt).toLocaleDateString()}</span>
                </div>
                {department.description && <p className="text-sm text-muted-foreground break-words line-clamp-2">{department.description}</p>}
                <div className="flex flex-wrap gap-1 mt-2">
                  <Badge
                    variant={department.isActive ? "default" : "secondary"}
                    className="cursor-pointer hover:opacity-80"
                    onClick={() => onStatusToggle(department.id, department.isActive)}
                  >
                    {department.isActive ? "표시" : "숨김"}
                  </Badge>
                </div>
                <div className="mt-2">
                  <div className="text-sm font-medium mb-1">진료과목</div>
                  <div className="flex flex-wrap gap-1">
                    {department.subjects?.length > 0 ? (
                      department.subjects.map((subject) => (
                        <Badge key={subject.id} variant="outline" className="text-xs">
                          {subject.name}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">등록된 진료과목이 없습니다</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(department.id)}>수정</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onAddSubjects(department.id)}>진료과목 추가</DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setDeleteId(department.id);
                      }}
                      className="text-red-600"
                    >
                      삭제
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>부서 삭제</AlertDialogTitle>
            <AlertDialogDescription>정말 이 부서를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</AlertDialogDescription>
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
