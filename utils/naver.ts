declare global {
  interface Window {
    naver: any;
  }
}

export interface NaverUser {
  email: string;
  nickname: string;
  profile_image?: string;
  id: string;
  name?: string;
}

export const initializeNaver = () => {
  if (!window.naver) {
    throw new Error("Naver SDK not loaded");
  }
  const naverLogin = new window.naver.LoginWithNaverId({
    clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
    callbackUrl: process.env.NEXT_PUBLIC_NAVER_CALLBACK_URL,
    isPopup: false,
    loginButton: {
      color: "green",
      type: 3,
      height: 45,
    },
  });
  naverLogin.init();
  return naverLogin;
};

export const naverLogin = () => {
  return new Promise<NaverUser>((resolve, reject) => {
    let attempts = 0;
    const maxAttempts = 50; // 5초 동안 시도 (100ms * 50)

    const waitForNaverSDK = setInterval(() => {
      attempts++;
      console.log(`Checking for Naver SDK... Attempt ${attempts}/${maxAttempts}`);

      if (window.naver) {
        clearInterval(waitForNaverSDK);
        try {
          console.log("Naver SDK found, initializing login...");
          const naverLogin = initializeNaver();

          naverLogin.getLoginStatus((status: boolean) => {
            console.log("Login status:", status);
            if (status) {
              console.log("User is logged in:", naverLogin.user);
              resolve(naverLogin.user);
            } else {
              window.location.href = naverLogin.generateAuthorizeUrl();
            }
          });
        } catch (error) {
          console.error("Error in naverLogin:", error);
          reject(error);
        }
      } else if (attempts >= maxAttempts) {
        clearInterval(waitForNaverSDK);
        reject(new Error("Naver SDK load timeout"));
      }
    }, 100);
  });
};

export const naverLogout = () => {
  return new Promise((resolve, reject) => {
    try {
      const naverLogin = initializeNaver();
      naverLogin.logout();
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
