"use client";

import { useHeader } from "@/app/providers/header-provider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar, LogOut, Menu, X, MoreVertical, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { initializeKakao, kakaoLogin, kakaoLogout, getCurrentUser, KakaoUserInfo } from "@/utils/kakao";
import { useKakao } from "@/app/providers/kakao-provider";

declare global {
  interface Window {
    Kakao: any;
  }
}

const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

const navigation = [
  { name: "인사말", href: "/about" },
  {
    name: "질병정보",
    href: "/diseases",
    items: [
      { name: "이명", href: "/diseases/tinnitus" },
      { name: "돌발성난청", href: "/diseases/sudden-hearing-loss" },
      { name: "어지럼증", href: "/diseases/dizziness" },
      { name: "이석증", href: "/diseases/bppv" },
      { name: "메니에르", href: "/diseases/meniere" },
      { name: "전정신경염", href: "/diseases/vestibular-neuritis" },
      { name: "귀먹먹함", href: "/diseases/ear-fullness" },
      { name: "두통", href: "/diseases/headache" },
    ],
  },
  { name: "진료안내", href: "/services" },
  { name: "비급여안내", href: "/non-covered" },
  { name: "시설안내", href: "/facilities" },
  { name: "예약문의", href: "/contact" },
];

// 예시 예약 데이터
const sampleReservations = [
  {
    id: 1,
    date: new Date(2024, 1, 15, 14, 30),
    department: "이명클리닉",
    status: "예약확정",
    patientName: "홍길동",
    phone: "010-1234-5678",
    symptoms: "이명 증상이 있습니다. 특히 밤에 심해집니다.",
  },
  {
    id: 2,
    date: new Date(2024, 1, 20, 11, 0),
    department: "어지럼증클리닉",
    status: "대기중",
    patientName: "김철수",
    phone: "010-1234-5678",
    symptoms: "어지러움이 심하고 구토 증상도 있습니다.",
  },
  {
    id: 3,
    date: new Date(2024, 1, 10, 15, 30),
    department: "난청클리닉",
    status: "진료완료",
    patientName: "이영희",
    phone: "010-9876-5432",
    symptoms: "갑자기 한쪽 귀의 청력이 떨어졌습니다.",
  },
  {
    id: 4,
    date: new Date(2024, 1, 25, 10, 0),
    department: "이석증클리닉",
    status: "예약확정",
    patientName: "박지민",
    phone: "010-9876-5432",
    symptoms: "누울 때마다 어지럽고 속이 좋지 않습니다.",
  },
  {
    id: 5,
    date: new Date(2024, 1, 18, 16, 30),
    department: "메니에르클리닉",
    status: "대기중",
    patientName: "최수진",
    phone: "010-5555-4444",
    symptoms: "어지럽고 귀가 먹먹하며 이명도 있습니다.",
  },
  {
    id: 6,
    date: new Date(2024, 1, 5, 9, 30),
    department: "두통클리닉",
    status: "진료완료",
    patientName: "강민수",
    phone: "010-5555-4444",
    symptoms: "만성 두통이 있으며 목도 아픕니다.",
  },
];

function ReservationActions({ reservation, onEdit, onCancel }: { reservation: (typeof sampleReservations)[0]; onEdit: () => void; onCancel: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit} className="text-blue-600">
          <Pencil className="mr-2 h-4 w-4" />
          수정하기
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onCancel} className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          예약취소
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NonMemberReservationDialog({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (phone: string) => void;
}) {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");

    if (value.length <= 11) {
      let formattedNumber = "";
      if (value.length <= 3) {
        formattedNumber = value;
      } else if (value.length <= 7) {
        formattedNumber = `${value.slice(0, 3)}-${value.slice(3)}`;
      } else {
        formattedNumber = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`;
      }
      setPhone(formattedNumber);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: API 호출로 변경
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onOpenChange(false);
      onSuccess(phone);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "조회 실패",
        description: "예약 내역을 찾을 수 없습니다. 전화번호를 다시 확인해주세요.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>비회원 예약 조회</DialogTitle>
          <DialogDescription>예약 시 입력하신 전화번호로 예약 내역을 조회할 수 있습니다.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="phone">전화번호</Label>
            <Input id="phone" type="tel" value={phone} onChange={handlePhoneChange} placeholder="010-0000-0000" maxLength={13} required />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "조회중..." : "예약 조회하기"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showReservations, setShowReservations] = useState(false);
  const [showNonMemberDialog, setShowNonMemberDialog] = useState(false);
  const [nonMemberPhone, setNonMemberPhone] = useState<string | null>(null);
  const { isHeaderVisible } = useHeader();
  const { toast } = useToast();
  const { userInfo, setUserInfo, updateLoginStatus } = useKakao();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleKakaoLogin = async () => {
    try {
      const user = await kakaoLogin();
      await updateLoginStatus();
    } catch (error) {
      console.error("Login Failed:", error);
      toast({
        variant: "destructive",
        title: "로그인 실패",
        description: "카카오 로그인 중 오류가 발생했습니다.",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await kakaoLogout();
      setUserInfo(null);
      console.log("로그아웃 되었습니다.");
    } catch (error) {
      console.error("Logout Failed:", error);
      toast({
        variant: "destructive",
        title: "로그아웃 실패",
        description: "로그아웃 중 오류가 발생했습니다.",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "예약확정":
        return "text-blue-600";
      case "대기중":
        return "text-yellow-600";
      case "진료완료":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  const handleReservationEdit = (reservation: (typeof sampleReservations)[0]) => {
    // TODO: 예약 수정 로직 구현
    toast({
      title: "준비 중인 기능입니다",
      description: "곧 예약 수정 기능이 제공될 예정입니다.",
    });
  };

  const handleReservationCancel = (reservation: (typeof sampleReservations)[0]) => {
    // TODO: 예약 취소 로직 구현
    toast({
      title: "예약이 취소되었습니다",
      description: `${format(reservation.date, "M월 d일 HH:mm")} 예약이 취소되었습니다.`,
    });
  };

  if (!isHeaderVisible) return null;

  return (
    <>
      <Dialog open={showReservations} onOpenChange={setShowReservations}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">예약 내역</DialogTitle>
            {nonMemberPhone && !userInfo?.nickname && <DialogDescription className="text-center">{nonMemberPhone} 님의 예약 내역입니다.</DialogDescription>}
            {userInfo?.nickname && <DialogDescription className="text-center">{userInfo.nickname} 님의 예약 내역입니다.</DialogDescription>}
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {userInfo?.nickname || nonMemberPhone ? (
              <>
                {sampleReservations.length > 0 ? (
                  <>
                    {sampleReservations
                      .filter((r) => {
                        if (userInfo?.nickname) {
                          // 카카오 로그인 사용자의 경우 닉네임으로 필터링 (실제로는 사용자 ID나 다른 식별자를 사용해야 함)
                          return r.patientName === userInfo.nickname;
                        } else if (nonMemberPhone) {
                          // 비회원의 경우 전화번호로 필터링
                          return r.phone === nonMemberPhone;
                        }
                        return false;
                      })
                      .map((reservation) => (
                        <div key={reservation.id} className="flex justify-between items-start p-4 bg-gray-100 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{format(reservation.date, "M월 d일 (EEE) HH:mm", { locale: ko })}</p>
                            <p className="text-sm text-gray-600 mt-0.5">{reservation.department}</p>
                            <p className="text-sm text-gray-600 mt-0.5">증상: {reservation.symptoms}</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className={`text-sm font-medium ${getStatusColor(reservation.status)}`}>{reservation.status}</span>
                            <ReservationActions
                              reservation={reservation}
                              onEdit={() => handleReservationEdit(reservation)}
                              onCancel={() => handleReservationCancel(reservation)}
                            />
                          </div>
                        </div>
                      ))}
                  </>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">예약 내역이 없습니다.</p>
                  </div>
                )}
              </>
            ) : (
              <div className="py-8 text-center space-y-4">
                <p className="text-gray-500">로그인하고 예약 내역을 확인하세요.</p>
                <div className="flex flex-col gap-2">
                  <Button onClick={handleKakaoLogin} className="bg-[#FEE500] text-black hover:bg-[#FEE500]/90 h-[45px]">
                    <Image src="/kakao_login_medium_wide.png" alt="카카오 로그인" width={300} height={45} className="w-full h-[45px] object-contain" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowReservations(false);
                      setShowNonMemberDialog(true);
                    }}
                  >
                    비회원 예약 조회
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <NonMemberReservationDialog
        open={showNonMemberDialog}
        onOpenChange={setShowNonMemberDialog}
        onSuccess={(phone) => {
          setNonMemberPhone(phone);
          setShowReservations(true);
        }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/70 backdrop-blur-md shadow-sm" : "bg-white shadow-sm"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image src="/logo.png" alt="소리청 일곡에스한방병원 로고" width={150} height={40} className="object-contain" priority />
              </Link>
            </div>

            {/* Desktop Navigation (lg 이상) */}
            <div className="hidden lg:flex lg:items-center lg:space-x-6">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} className="nav-link">
                  {item.name}
                </Link>
              ))}
              {userInfo?.nickname ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowReservations(true)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    <Calendar className="h-4 w-4" />
                    예약내역
                  </button>
                  <div className="h-4 w-px bg-gray-300" />
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    로그아웃
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowNonMemberDialog(true)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    <Calendar className="h-4 w-4" />
                    예약조회
                  </button>
                  <div className="h-4 w-px bg-gray-300" />
                  <button onClick={handleKakaoLogin} className="flex justify-center">
                    <Image src="/kakao_login_medium_narrow.png" alt="카카오 로그인" width={120} height={30} className="h-auto" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile & Tablet menu button */}
            <div className="flex lg:hidden">
              <button type="button" className="text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile & Tablet Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {userInfo?.nickname ? (
                  <div className="mt-4 px-3">
                    <button
                      onClick={() => setShowReservations(true)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 bg-white border border-gray-200 rounded-lg transition-all"
                    >
                      <Calendar className="h-4 w-4" />
                      예약내역 보기
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 mt-3 text-sm font-medium text-gray-600 hover:text-gray-800 bg-white border border-gray-200 rounded-lg transition-all"
                    >
                      <LogOut className="h-4 w-4" />
                      로그아웃
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 px-3 space-y-3">
                    <button
                      onClick={() => setShowNonMemberDialog(true)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 bg-white border border-gray-200 rounded-lg transition-all"
                    >
                      <Calendar className="h-4 w-4" />
                      예약조회
                    </button>
                    <button onClick={handleKakaoLogin} className="flex justify-center w-full">
                      <Image
                        src="/kakao_login_medium_wide.png"
                        alt="카카오 로그인"
                        width={300}
                        height={45}
                        className="w-full h-[45px] object-contain bg-[#FEE500] rounded-lg hover:bg-[#FEE500]/90 transition-colors"
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
