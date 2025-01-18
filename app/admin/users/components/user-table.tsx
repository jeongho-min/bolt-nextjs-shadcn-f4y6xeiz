"use client";

import { User, UserRole } from "@prisma/client";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable, Column } from "@/app/components/ui/data-table";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface UserTableProps {
  users: User[];
  onRoleChange: (id: string, role: UserRole) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function UserTable({ users, onRoleChange, onEdit, onDelete }: UserTableProps) {
  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "destructive";
      case UserRole.USER:
        return "secondary";
      default:
        return "secondary";
    }
  };

  const roleOptions = [
    { label: "관리자", value: UserRole.ADMIN },
    { label: "일반 사용자", value: UserRole.USER },
  ];

  const columns: Column<User>[] = [
    {
      header: "이름",
      cell: (user: User) => (
        <div>
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
        </div>
      ),
    },
    {
      header: "연락처",
      accessorKey: "phone",
    },
    {
      header: "권한",
      className: "w-[180px]",
      cell: (user: User) => (
        <Select value={user.role} onValueChange={(value) => onRoleChange(user.id, value as UserRole)}>
          <SelectTrigger>
            <SelectValue>
              <Badge variant={getRoleBadgeVariant(user.role)}>{roleOptions.find((option) => option.value === user.role)?.label}</Badge>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {roleOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <Badge variant={getRoleBadgeVariant(option.value)}>{option.label}</Badge>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ),
    },
    {
      header: "가입일",
      cell: (user: User) => format(new Date(user.createdAt), "PPP", { locale: ko }),
    },
    {
      header: "",
      className: "w-[80px]",
      cell: (user: User) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">메뉴 열기</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(user.id)}>수정</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(user.id)} className="text-destructive">
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return <DataTable data={users} columns={columns} pageSize={10} />;
}
