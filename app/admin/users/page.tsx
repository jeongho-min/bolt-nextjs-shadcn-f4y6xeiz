"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";
import { User, UserRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Image from "next/image";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [roleFilter, setRoleFilter] = useState<UserRole | "ALL">("ALL");
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (roleFilter === "ALL") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((user) => user.role === roleFilter));
    }
  }, [roleFilter, users]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      toast({
        title: "회원 정보 로딩 실패",
        description: "회원 정보를 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleRoleChange = async (id: string, newRole: UserRole) => {
    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        fetchUsers();
        toast({
          title: "권한 변경 성공",
          description: "회원 권한이 성공적으로 변경되었습니다.",
        });
      } else {
        const error = await response.text();
        throw new Error(error);
      }
    } catch (error) {
      toast({
        title: "권한 변경 실패",
        description: error instanceof Error ? error.message : "회원 권한 변경에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      fetchUsers();
      toast({
        title: "성공",
        description: "회원이 삭제되었습니다.",
      });
    } catch (error) {
      toast({
        title: "오류",
        description: error instanceof Error ? error.message : "회원 삭제 중 문제가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  const tableHeaders = [
    { label: "회원정보", width: "w-[250px]" },
    { label: "이메일", width: "w-[250px]" },
    { label: "전화번호", width: "w-[150px]" },
    { label: "권한", width: "w-[150px]" },
    { label: "가입일", width: "w-[150px]" },
    { label: "관리", width: "w-[100px]", align: "text-right" },
  ];

  const roleOptions = [
    { label: "전체", value: "ALL" },
    { label: "관리자", value: "ADMIN" },
    { label: "일반회원", value: "USER" },
  ];

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.push("/admin")} className="h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">회원 관리</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">권한 필터:</span>
            <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value as UserRole | "ALL")}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline">전체: {users.length}</Badge>
            <Badge variant="default">관리자: {users.filter((user) => user.role === "ADMIN").length}</Badge>
            <Badge variant="secondary">일반회원: {users.filter((user) => user.role === "USER").length}</Badge>
          </div>
        </div>
      </div>

      <div className="rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {tableHeaders.map((header, index) => (
                <TableHead key={index} className={cn(header.width, "py-5 px-6", header.align, "font-semibold")}>
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/50">
                <TableCell className="py-5 px-6">
                  <div className="flex items-center gap-3">
                    {user.image && (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image src={user.image} alt={user.name || ""} fill className="object-cover" />
                      </div>
                    )}
                    <span className="font-medium">{user.name || "이름 없음"}</span>
                  </div>
                </TableCell>
                <TableCell className="py-5 px-6 text-muted-foreground">{user.email || "-"}</TableCell>
                <TableCell className="py-5 px-6 text-muted-foreground">{user.phone || "-"}</TableCell>
                <TableCell className="py-5 px-6">
                  <Select value={user.role} onValueChange={(value) => handleRoleChange(user.id, value as UserRole)}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">관리자</SelectItem>
                      <SelectItem value="USER">일반회원</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="py-5 px-6 text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="py-5 px-6 text-right">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive">
                        삭제
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>회원 삭제</AlertDialogTitle>
                        <AlertDialogDescription>정말로 이 회원을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>취소</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(user.id)}>삭제</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
