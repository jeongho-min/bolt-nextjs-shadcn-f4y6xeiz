"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Phone, Clock, X, Calendar, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHeader } from "@/app/providers/header-provider";

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
              <Link key={item.name} href={item.href} className="nav-link">
                {item.name}
              </Link>
            ))}
            {userNickname ? (
              <div className="flex items-center gap-2">
                <Link href="/reservations" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors">
                  <Calendar className="h-4 w-4" />
                  예약내역
                </Link>
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
              <button onClick={handleKakaoLogin} className="flex items-center gap-2 px-4 py-2 bg-[#FEE500] hover:bg-[#FEE500]/90 rounded-md transition-colors">
                <Image src="/kakaotalk_sharing_btn_small.png" alt="카카오 아이콘" width={20} height={20} className="h-auto" />
                <span className="text-sm font-medium text-[#000000]">로그인</span>
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
              <Button variant="default" className="w-full mt-4">
                <Phone className="mr-2 h-4 w-4" />
                062-369-2075
              </Button>
              {userNickname ? (
                <div className="flex flex-col gap-2 mt-4 px-3">
                  <div className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg">
                    <Link href="/reservations" className="inline-flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                      <Calendar className="h-4 w-4" />
                      예약내역
                    </Link>
                    <div className="h-4 w-px bg-gray-300" />
                    <button onClick={handleLogout} className="inline-flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                      <LogOut className="h-4 w-4" />
                      로그아웃
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleKakaoLogin}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 mt-2 bg-[#FEE500] hover:bg-[#FEE500]/90 rounded-md transition-colors"
                >
                  <Image src="/kakaotalk_sharing_btn_small.png" alt="카카오 아이콘" width={20} height={20} className="h-auto" />
                  <span className="text-sm font-medium text-[#000000]">로그인</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
