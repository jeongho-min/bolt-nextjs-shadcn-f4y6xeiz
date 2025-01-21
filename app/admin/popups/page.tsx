"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PopupTable } from "./components/popup-table";
import { useEffect, useState } from "react";
import { PopupNotice } from "@prisma/client";
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
import { toast } from "sonner";
import { PageLayout } from "../components/page-layout";
import { Badge } from "@/components/ui/badge";

export default function PopupsPage() {
  const router = useRouter();
  const [popups, setPopups] = useState<PopupNotice[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchPopups = async () => {
    try {
      const response = await fetch("/api/admin/popups");
      if (!response.ok) throw new Error("팝업 목록을 불러오는데 실패했습니다.");
      const data = await response.json();
      setPopups(data);
    } catch (error) {
      toast.error("팝업 목록을 불러오는데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchPopups();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/popups/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("팝업 삭제에 실패했습니다.");

      await fetchPopups();
      toast.success("팝업이 삭제되었습니다.");
    } catch (error) {
      toast.error("팝업 삭제에 실패했습니다.");
    }
  };

  const HeaderContent = () => (
    <div className="flex items-center gap-4">
      <div className="flex gap-2">
        <Badge variant="outline">전체: {popups.length}</Badge>
        <Badge variant="default">공지: {popups.filter((popup) => popup.category === "NOTICE").length}</Badge>
        <Badge variant="secondary">안내: {popups.filter((popup) => popup.category === "INFO").length}</Badge>
        <Badge variant="destructive">이벤트: {popups.filter((popup) => popup.category === "EVENT").length}</Badge>
      </div>
    </div>
  );

  return (
    <PageLayout
      title="팝업 관리"
      backUrl="/admin"
      headerContent={<HeaderContent />}
      actions={[
        {
          label: "새 팝업",
          onClick: () => router.push("/admin/popups/new"),
        },
      ]}
    >
      <AlertDialog>
        <PopupTable popups={popups} onDelete={(id) => setSelectedId(id)} />

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>팝업 삭제</AlertDialogTitle>
            <AlertDialogDescription>정말로 이 팝업을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedId(null)}>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (selectedId) {
                  handleDelete(selectedId);
                  setSelectedId(null);
                }
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  );
}
