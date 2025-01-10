"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { KakaoUserInfo, getCurrentUser, initializeKakao } from "@/utils/kakao";

interface KakaoContextType {
  userInfo: KakaoUserInfo | null;
  setUserInfo: (user: KakaoUserInfo | null) => void;
  updateLoginStatus: () => Promise<void>;
}

const KakaoContext = createContext<KakaoContextType | undefined>(undefined);

export function KakaoProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<KakaoUserInfo | null>(null);

  useEffect(() => {
    const cleanup = initializeKakao();
    updateLoginStatus();
    return cleanup;
  }, []);

  const updateLoginStatus = async () => {
    const user = await getCurrentUser();
    setUserInfo(user);
  };

  return (
    <KakaoContext.Provider
      value={{
        userInfo,
        setUserInfo,
        updateLoginStatus,
      }}
    >
      {children}
    </KakaoContext.Provider>
  );
}

export function useKakao() {
  const context = useContext(KakaoContext);
  if (context === undefined) {
    throw new Error("useKakao must be used within a KakaoProvider");
  }
  return context;
}
