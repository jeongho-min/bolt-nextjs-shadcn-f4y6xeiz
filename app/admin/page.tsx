"use client";

import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2, Users, Stethoscope, Calendar, ClipboardList, Receipt, Bell, MessageSquareMore } from "lucide-react";

export default function AdminPage() {
  const router = useRouter();

  const menuItems = [
    {
      title: "부서 관리",
      description: "진료과 부서를 생성하고 관리합니다.",
      icon: Building2,
      href: "/admin/departments",
    },
    {
      title: "의사 관리",
      description: "의료진 정보를 등록하고 관리합니다.",
      icon: Stethoscope,
      href: "/admin/doctors",
    },
    // {
    //   title: "질병 관리",
    //   description: "질병 정보를 등록하고 관리합니다.",
    //   icon: ClipboardList,
    //   href: "/admin/diseases",
    // },
    {
      title: "예약 관리",
      description: "환자 예약 현황을 확인하고 관리합니다.",
      icon: Calendar,
      href: "/admin/reservations",
    },
    {
      title: "회원 관리",
      description: "회원 정보를 확인하고 관리합니다.",
      icon: Users,
      href: "/admin/users",
    },
    {
      title: "가격표 관리",
      description: "진료 및 처방 가격을 관리합니다",
      icon: Receipt,
      href: "/admin/prices",
    },
    {
      title: "공지사항 관리",
      description: "병원 공지사항을 등록하고 관리합니다.",
      icon: Bell,
      href: "/admin/notices",
    },
    {
      title: "팝업 관리",
      description: "메인 페이지 팝업을 등록하고 관리합니다.",
      icon: MessageSquareMore,
      href: "/admin/popups",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">관리자 대시보드</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.href} className="hover:bg-accent cursor-pointer transition-colors" onClick={() => router.push(item.href)}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
