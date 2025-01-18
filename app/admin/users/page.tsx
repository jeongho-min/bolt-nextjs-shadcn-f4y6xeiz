"use client";

import { useEffect, useState } from "react";
import { User, UserRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
import { PageLayout } from "../components/page-layout";
import { UserTable } from "./components/user-table";
import { UserCards } from "./components/user-cards";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [roleFilter, setRoleFilter] = useState<UserRole | "ALL">("ALL");
  const [viewType, setViewType] = useState<"table" | "grid">("table");
  const router = useRouter();
  const { toast } = useToast();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setViewType(isDesktop ? "table" : "grid");
  }, [isDesktop]);

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

  const handleEdit = (id: string) => {
    router.push(`/admin/users/${id}`);
  };

  const roleOptions = [
    { label: "전체", value: "ALL" },
    { label: "관리자", value: "ADMIN" },
    { label: "일반회원", value: "USER" },
  ];

  const HeaderContent = () => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
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
  );

  return (
    <PageLayout
      title="회원 관리"
      onBack={() => router.push("/admin")}
      headerContent={<HeaderContent />}
      viewOptions={{
        isDesktop,
        viewType,
        onViewChange: setViewType,
      }}
    >
      {viewType === "table" && isDesktop ? (
        <UserTable users={filteredUsers} onRoleChange={handleRoleChange} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <UserCards users={filteredUsers} onRoleChange={handleRoleChange} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </PageLayout>
  );
}
