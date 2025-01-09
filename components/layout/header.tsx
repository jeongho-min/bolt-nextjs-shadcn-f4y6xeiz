"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Phone, Clock, X, LogIn, ChevronDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHeader } from "@/app/providers/header-provider";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userNickname, setUserNickname] = useState<string | null>(null);
  const { isHeaderVisible } = useHeader();

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

  if (!isHeaderVisible) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/70 backdrop-blur-md shadow-sm" : "bg-white shadow-sm"}`}
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
              <Link key={item.name} href={item.href} className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
                {item.name}
              </Link>
            ))}
            {userNickname ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-white hover:bg-gray-50 border border-gray-200 shadow-sm transition-all">
                    <span className="text-gray-700 font-medium text-sm">{userNickname}님</span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-1 bg-white rounded-lg border border-gray-200 shadow-lg">
                  <DropdownMenuItem asChild className="focus:bg-gray-50">
                    <Link href="/reservations" className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-md hover:bg-gray-50 transition-colors">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-gray-700">예약내역</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-md text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>로그아웃</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button onClick={handleKakaoLogin} className="focus:outline-none hover:opacity-90 transition-opacity">
                <Image src="/kakao_login_medium.png" alt="카카오 로그인" width={90} height={22} className="h-auto" />
              </button>
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
            <div className="space-y-2 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="h-px bg-gray-100 my-4" />
              <Button variant="default" className="w-full">
                <Phone className="mr-2 h-4 w-4" />
                062-369-2075
              </Button>
              {userNickname ? (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-200 bg-gray-50">
                    <span className="text-gray-700 font-medium">{userNickname}님</span>
                  </div>
                  <Link
                    href="/reservations"
                    className="flex items-center justify-center w-full gap-2 px-4 py-2 text-primary bg-primary/5 hover:bg-primary/10 rounded-md transition-colors"
                  >
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">예약내역</span>
                  </Link>
                  <Button variant="outline" className="w-full border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600" onClick={handleLogout}>
                    <LogIn className="h-4 w-4 mr-2" />
                    로그아웃
                  </Button>
                </div>
              ) : (
                <button
                  onClick={handleKakaoLogin}
                  className="w-full mt-4 flex items-center justify-center focus:outline-none hover:opacity-90 transition-opacity"
                >
                  <Image src="/kakao_login_medium.png" alt="카카오 로그인" width={110} height={27} className="h-auto" />
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
