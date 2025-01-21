"use client";

import { PageLayout } from "@/app/admin/components/page-layout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

interface Holiday {
  id: string;
  title: string;
  description: string | null;
  type: "REGULAR" | "SPECIAL" | "TEMPORARY";
  regularType: "WEEKLY" | "MONTHLY" | "YEARLY" | null;
  dayOfWeek: number | null;
  weekOfMonth: number | null;
  dayOfMonth: number | null;
  monthOfYear: number | null;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean;
  createdAt: string;
  createdBy: {
    name: string | null;
  } | null;
}

export default function HolidaysPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const response = await fetch("/api/admin/holidays");
      if (!response.ok) throw new Error("휴일 목록을 불러오는데 실패했습니다.");
      const data = await response.json();
      setHolidays(data);
    } catch (error) {
      toast({
        title: "오류",
        description: "휴일 목록을 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/holidays/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("휴일 삭제에 실패했습니다.");

      await fetchHolidays();
      toast({
        title: "성공",
        description: "휴일이 삭제되었습니다.",
      });
    } catch (error) {
      toast({
        title: "오류",
        description: "휴일 삭제에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const formatHolidayDate = (holiday: Holiday) => {
    if (holiday.type === "REGULAR") {
      switch (holiday.regularType) {
        case "WEEKLY":
          return `매주 ${["일", "월", "화", "수", "목", "금", "토"][holiday.dayOfWeek || 0]}요일`;
        case "MONTHLY":
          if (holiday.weekOfMonth) {
            return `매월 ${holiday.weekOfMonth}번째 ${["일", "월", "화", "수", "목", "금", "토"][holiday.dayOfWeek || 0]}요일`;
          }
          return `매월 ${holiday.dayOfMonth}일`;
        case "YEARLY":
          return `매년 ${holiday.monthOfYear}월 ${holiday.dayOfMonth}일`;
        default:
          return "-";
      }
    } else {
      if (holiday.startDate && holiday.endDate) {
        const start = format(new Date(holiday.startDate), "yyyy.MM.dd", { locale: ko });
        const end = format(new Date(holiday.endDate), "yyyy.MM.dd", { locale: ko });
        return `${start} ~ ${end}`;
      }
      return "-";
    }
  };

  const getHolidayTypeBadge = (type: Holiday["type"]) => {
    switch (type) {
      case "REGULAR":
        return <Badge variant="outline">정기 휴일</Badge>;
      case "SPECIAL":
        return <Badge variant="secondary">특별 휴일</Badge>;
      case "TEMPORARY":
        return <Badge variant="destructive">임시 휴진</Badge>;
    }
  };

  return (
    <PageLayout title="휴일 관리" backUrl="/admin">
      <div className="mb-4 flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">휴일 목록</h2>
          <p className="text-sm text-muted-foreground">정기 휴일과 특별 휴일, 임시 휴진을 관리합니다.</p>
        </div>
        <Button onClick={() => router.push("/admin/holidays/new")}>
          <Plus className="mr-2 h-4 w-4" />새 휴일
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>유형</TableHead>
              <TableHead>제목</TableHead>
              <TableHead>날짜/기간</TableHead>
              <TableHead>설명</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>등록자</TableHead>
              <TableHead className="text-right">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holidays.map((holiday) => (
              <TableRow key={holiday.id}>
                <TableCell>{getHolidayTypeBadge(holiday.type)}</TableCell>
                <TableCell>{holiday.title}</TableCell>
                <TableCell>{formatHolidayDate(holiday)}</TableCell>
                <TableCell>{holiday.description || "-"}</TableCell>
                <TableCell>
                  <Badge variant={holiday.isActive ? "default" : "secondary"}>{holiday.isActive ? "활성" : "비활성"}</Badge>
                </TableCell>
                <TableCell>{holiday.createdBy?.name || "-"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/holidays/${holiday.id}`)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>휴일 삭제</AlertDialogTitle>
                          <AlertDialogDescription>정말로 이 휴일을 삭제하시겠습니까?</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>취소</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(holiday.id)}>삭제</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </PageLayout>
  );
}
