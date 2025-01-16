"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface NaverUser {
  id: string;
  email: string;
  nickname: string;
  name: string;
  profile_image?: string;
}

interface NaverContextType {
  userInfo: NaverUser | null;
  setUserInfo: (user: NaverUser | null) => void;
  updateLoginStatus: () => Promise<void>;
}

const NaverContext = createContext<NaverContextType>({
  userInfo: null,
  setUserInfo: () => {},
  updateLoginStatus: async () => {},
});

export function NaverProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<NaverUser | null>(null);

  const updateLoginStatus = async () => {
    try {
      if (!window.naver) {
        console.log("Naver SDK not loaded");
        return;
      }

      const naverLogin = new window.naver.LoginWithNaverId({
        clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
        callbackUrl: process.env.NEXT_PUBLIC_NAVER_CALLBACK_URL,
        isPopup: false,
      });

      naverLogin.init();

      return new Promise<void>((resolve) => {
        naverLogin.getLoginStatus((status: boolean) => {
          console.log("Naver Login Status:", status);
          if (status) {
            const user = naverLogin.user;
            console.log("Naver User from Status Check:", user);
            if (user) {
              setUserInfo({
                id: user.id,
                email: user.email,
                nickname: user.nickname || user.name || user.email.split("@")[0],
                name: user.name || "",
                profile_image: user.profile_image,
              });
            }
          } else {
            setUserInfo(null);
          }
          resolve();
        });
      });
    } catch (error) {
      console.error("Failed to update Naver login status:", error);
      setUserInfo(null);
    }
  };

  // 컴포넌트 마운트 시 로그인 상태 확인
  useEffect(() => {
    console.log("NaverProvider mounted, checking login status");
    const checkLoginStatus = async () => {
      if (window.naver) {
        await updateLoginStatus();
      } else {
        const interval = setInterval(async () => {
          if (window.naver) {
            clearInterval(interval);
            await updateLoginStatus();
          }
        }, 500);

        // 5초 후에도 로드되지 않으면 인터벌 정리
        setTimeout(() => clearInterval(interval), 5000);
      }
    };

    checkLoginStatus();
  }, []);

  // userInfo 변경 시 로깅
  useEffect(() => {
    console.log("NaverProvider userInfo changed:", userInfo);
  }, [userInfo]);

  return (
    <NaverContext.Provider
      value={{
        userInfo,
        setUserInfo,
        updateLoginStatus,
      }}
    >
      {children}
    </NaverContext.Provider>
  );
}

export const useNaver = () => {
  const context = useContext(NaverContext);
  if (!context) {
    throw new Error("useNaver must be used within a NaverProvider");
  }
  return context;
};
