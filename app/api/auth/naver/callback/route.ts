import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { hash } = new URL(request.url);

  // URL 해시에서 토큰 정보 추출
  const params = new URLSearchParams(hash.substring(1));
  const accessToken = params.get("access_token");
  const tokenType = params.get("token_type");
  const expiresIn = params.get("expires_in");

  if (!accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    // 네이버 사용자 정보 가져오기
    const response = await fetch("https://openapi.naver.com/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user info");
    }

    const data = await response.json();
    console.log("🚀 ~ GET ~ data:", data);

    // 성공 시 메인 페이지로 리다이렉트
    const redirectUrl = new URL("/", request.url);
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Error in Naver callback:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}
