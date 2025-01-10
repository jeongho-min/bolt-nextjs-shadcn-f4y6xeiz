const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

declare global {
  interface Window {
    Kakao: any;
  }
}

export type KakaoUserInfo = {
  nickname: string;
  phone?: string;
};

export const initializeKakao = () => {
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
};

export const isKakaoInitialized = () => {
  return window.Kakao?.isInitialized() || false;
};

export const getKakaoAccessToken = () => {
  return window.Kakao?.Auth?.getAccessToken();
};

export const kakaoLogin = () => {
  if (!window.Kakao) {
    console.error("Kakao SDK not loaded");
    return Promise.reject(new Error("Kakao SDK not loaded"));
  }

  if (!window.Kakao.isInitialized()) {
    console.error("Kakao SDK not initialized");
    return Promise.reject(new Error("Kakao SDK not initialized"));
  }

  return new Promise<KakaoUserInfo>((resolve, reject) => {
    window.Kakao.Auth.login({
      success: (authObj: any) => {
        console.log("Login Token Info:", authObj);
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: (res: any) => {
            const kakaoAccount = res.kakao_account;
            console.log("User Info:", kakaoAccount);
            if (kakaoAccount?.profile?.nickname) {
              resolve({
                nickname: kakaoAccount.profile.nickname,
              });
            } else {
              reject(new Error("Failed to get user nickname"));
            }
          },
          fail: (error: any) => {
            console.error("Failed to get user info", error);
            reject(error);
          },
        });
      },
      fail: (error: any) => {
        console.error("Login Failed", error);
        reject(error);
      },
      scope: "profile_nickname,profile_image",
    });
  });
};

export const kakaoLogout = () => {
  if (!window.Kakao) return Promise.reject(new Error("Kakao SDK not loaded"));

  return new Promise<void>((resolve, reject) => {
    window.Kakao.Auth.logout(() => {
      console.log("로그아웃 되었습니다.");
      resolve();
    });
  });
};

export const getCurrentUser = async (): Promise<KakaoUserInfo | null> => {
  if (!getKakaoAccessToken()) return null;

  try {
    const response: { kakao_account?: { profile?: { nickname: string }; phone_number?: string } } = await new Promise((resolve, reject) => {
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: resolve,
        fail: reject,
      });
    });

    const kakaoAccount = response.kakao_account;
    if (kakaoAccount?.profile?.nickname) {
      return {
        nickname: kakaoAccount.profile.nickname,
        phone: kakaoAccount.phone_number,
      };
    }
    return null;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
};
