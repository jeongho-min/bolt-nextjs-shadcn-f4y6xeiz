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
  { name: "진료사례", href: "/services" },
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
  const [userNickname, setUserNickname] = useState<string | null>(null);
  const [showReservations, setShowReservations] = useState(false);
  const [showNonMemberDialog, setShowNonMemberDialog] = useState(false);
  const [nonMemberPhone, setNonMemberPhone] = useState<string | null>(null);
  const { isHeaderVisible } = useHeader();
  const { toast } = useToast();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;

    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized() && KAKAO_JS_KEY) {
        window.Kakao.init(KAKAO_JS_KEY);
        console.log("Kakao SDK initialized");
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleKakaoLogin = () => {
    if (!window.Kakao) {
      console.error("Kakao SDK not loaded");
      return;
    }

    if (!window.Kakao.isInitialized()) {
      console.error("Kakao SDK not initialized");
      return;
    }

    window.Kakao.Auth.login({
      success: (authObj: any) => {
        console.log("Login Token Info:", authObj);
        // 사용자 정보 가져오기
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: (res: any) => {
            const kakaoAccount = res.kakao_account;
            console.log("User Info:", kakaoAccount);
            if (kakaoAccount?.profile?.nickname) {
              setUserNickname(kakaoAccount.profile.nickname);
            }
          },
          fail: (error: any) => {
            console.error("Failed to get user info", error);
          },
        });
      },
      fail: (error: any) => {
        console.error("Login Failed", error);
      },
      scope: "profile_nickname,profile_image",
    });
  };

  const handleLogout = () => {
    if (!window.Kakao) return;

    window.Kakao.Auth.logout(() => {
      setUserNickname(null);
      console.log("로그아웃 되었습니다.");
    });
  };

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
            {nonMemberPhone && <DialogDescription className="text-center">{nonMemberPhone} 님의 예약 내역입니다.</DialogDescription>}
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {userNickname || nonMemberPhone ? (
              <>
                {sampleReservations.length > 0 ? (
                  <>
                    {sampleReservations
                      .filter((r) => !nonMemberPhone || r.phone === nonMemberPhone)
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
                  <Button onClick={handleKakaoLogin} className="bg-[#FEE500] text-black hover:bg-[#FEE500]/90">
                    카카오로 로그인
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

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} className="nav-link">
                  {item.name}
                </Link>
              ))}
              {userNickname ? (
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
                  <button
                    onClick={handleKakaoLogin}
                    className="flex items-center gap-2 px-4 py-2 bg-[#FEE500] hover:bg-[#FEE500]/90 rounded-md transition-colors"
                  >
                    <Image src="/kakaotalk_sharing_btn_small.png" alt="카카오 아이콘" width={20} height={20} className="h-auto" />
                    <span className="text-sm font-medium text-[#000000]">로그인</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button type="button" className="text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden">
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

                {userNickname ? (
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
                    <button
                      onClick={handleKakaoLogin}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-[#FEE500] hover:bg-[#FEE500]/90 rounded-md transition-colors"
                    >
                      <Image src="/kakaotalk_sharing_btn_small.png" alt="카카오 아이콘" width={20} height={20} className="h-auto" />
                      <span className="text-sm font-medium text-[#000000]">로그인</span>
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
