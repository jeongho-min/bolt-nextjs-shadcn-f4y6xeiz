"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { ArrowLeft } from "lucide-react";

interface UserEditPageProps {
  params: {
    id: string;
  };
}

export default function UserEditPage({ params }: UserEditPageProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchUser();
  }, [params.id]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/admin/users/${params.id}`);
      if (!response.ok) {
        throw new Error("회원을 찾을 수 없습니다.");
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      toast({
        title: "회원 정보 로딩 실패",
        description: error instanceof Error ? error.message : "회원 정보를 불러오는데 실패했습니다.",
        variant: "destructive",
      });
      router.push("/admin/users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;
      const phone = formData.get("phone") as string;

      const response = await fetch(`/api/admin/users/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      toast({
        title: "성공",
        description: "회원 정보가 수정되었습니다.",
      });

      router.push("/admin/users");
      router.refresh();
    } catch (error) {
      toast({
        title: "오류",
        description: error instanceof Error ? error.message : "회원 정보 수정에 실패했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/admin/users/${params.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      toast({
        title: "성공",
        description: "회원이 삭제되었습니다.",
      });

      router.push("/admin/users");
      router.refresh();
    } catch (error) {
      toast({
        title: "오류",
        description: error instanceof Error ? error.message : "회원 삭제 중 문제가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={() => router.push("/admin/users")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 flex justify-between items-center">
            <h1 className="text-2xl font-bold">회원 수정</h1>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">삭제</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>회원 삭제</AlertDialogTitle>
                  <AlertDialogDescription>정말로 이 회원을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>삭제</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              이메일
            </label>
            <Input id="email" value={user.email || ""} disabled />
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              이름
            </label>
            <Input id="name" name="name" required defaultValue={user.name || ""} placeholder="이름을 입력하세요" />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              전화번호
            </label>
            <Input id="phone" name="phone" defaultValue={user.phone || ""} placeholder="전화번호를 입력하세요" />
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
              취소
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "처리중..." : "수정 완료"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
