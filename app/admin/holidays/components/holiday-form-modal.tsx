"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";

interface HolidayFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  selectedEndDate: Date | null;
  onSuccess?: () => void;
  mode: "create" | "edit";
  initialData?: {
    id: string;
    title: string;
    description: string | null;
    startDate: string | null;
    endDate: string | null;
    isActive: boolean;
  } | null;
}

export function HolidayFormModal({ isOpen, onClose, selectedDate, selectedEndDate, onSuccess, mode, initialData }: HolidayFormModalProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [startDate, setStartDate] = useState<Date | undefined>(initialData?.startDate ? parseISO(initialData.startDate) : selectedDate || undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(initialData?.endDate ? parseISO(initialData.endDate) : selectedEndDate || undefined);
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);

  // 모달이 열릴 때마다 초기값 설정
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title);
        setDescription(initialData.description || "");
        setStartDate(initialData.startDate ? parseISO(initialData.startDate) : undefined);
        setEndDate(initialData.endDate ? parseISO(initialData.endDate) : undefined);
        setIsActive(initialData.isActive);
      } else {
        setTitle("");
        setDescription("");
        setStartDate(selectedDate || undefined);
        setEndDate(selectedEndDate || undefined);
        setIsActive(true);
      }
    }
  }, [isOpen, initialData, selectedDate, selectedEndDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate) {
      toast({
        title: "시작일을 선택해주세요.",
        variant: "destructive",
      });
      return;
    }

    try {
      const url = mode === "create" ? "/api/admin/holidays" : `/api/admin/holidays/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          startDate: startDate.toISOString(),
          endDate: endDate?.toISOString() || null,
          isActive,
        }),
      });

      if (!response.ok) {
        throw new Error(mode === "create" ? "휴일 등록에 실패했습니다." : "휴일 수정에 실패했습니다.");
      }

      toast({
        title: mode === "create" ? "휴일이 등록되었습니다." : "휴일이 수정되었습니다.",
      });

      if (onSuccess) {
        onSuccess();
      }

      onClose();
      setTitle("");
      setDescription("");
      setStartDate(undefined);
      setEndDate(undefined);
      setIsActive(true);
    } catch (error) {
      toast({
        title: mode === "create" ? "휴일 등록에 실패했습니다." : "휴일 수정에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;

    try {
      const response = await fetch(`/api/admin/holidays/${initialData.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("휴일 삭제에 실패했습니다.");
      }

      toast({
        title: "휴일이 삭제되었습니다.",
      });

      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (error) {
      toast({
        title: "휴일 삭제에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "휴일 등록" : "휴일 수정"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              제목
            </label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="휴일 제목을 입력하세요" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              설명
            </label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="휴일에 대한 설명을 입력하세요" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">시작일</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !startDate && "text-muted-foreground")}>
                    {startDate ? format(startDate, "PPP", { locale: ko }) : <span>시작일 선택</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">종료일</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !endDate && "text-muted-foreground")}>
                    {endDate ? format(endDate, "PPP", { locale: ko }) : <span>종료일 선택</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} disabled={(date) => date < (startDate || new Date())} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="isActive" checked={isActive} onCheckedChange={setIsActive} />
            <label htmlFor="isActive" className="text-sm font-medium">
              활성화
            </label>
          </div>
          <div className="flex justify-between space-x-2">
            <div className="flex space-x-2">
              {mode === "edit" && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button type="button" variant="destructive">
                      삭제
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>휴일 삭제</AlertDialogTitle>
                      <AlertDialogDescription>정말로 이 휴일을 삭제하시겠습니까?</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>취소</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>삭제</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
            <div className="flex space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                취소
              </Button>
              <Button type="submit">{mode === "create" ? "등록" : "수정"}</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
