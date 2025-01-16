"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNaver } from "@/app/providers/naver-provider";

export default function NaverCallback() {
  const router = useRouter();
  const { setUserInfo } = useNaver();

  useEffect(() => {
    const processCallback = async () => {
      try {
        // URL 해시에서 토큰 정보 추출
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");

        if (!accessToken) {
          throw new Error("No access token found");
        }

        // 네이버 사용자 정보 가져오기
        const response = await fetch("https://openapi.naver.com/v1/nid/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const { response: userData } = await response.json();

        // 사용자 정보 저장
        setUserInfo({
          id: userData.id,
          email: userData.email,
          nickname: userData.nickname,
          name: userData.name,
          profile_image: userData.profile_image,
        });

        // 메인 페이지로 리다이렉트
        router.push("/");
      } catch (error) {
        console.error("Error processing Naver callback:", error);
        router.push("/");
      }
    };

    processCallback();
  }, [router, setUserInfo]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">로그인 처리 중...</h2>
        <p className="text-gray-600">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}
