"use client";

interface SigninResponse {
  message: string;
  statusCode: number;
  data: {
    accessToken: string;
    refreshToken: string;
    webUser: {
      id: number;
      nickname: string;
      email: string;
      role: "USER";
      webProfileId: number;
    };
  };
}

import { useAuthStore } from "@/store/useAuthStore";
import { ErrorResponse } from "@/app/types/ErrorResponse";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { checkHasWebProfile } from "@/app/lib/api/checkHasProfile";

const KakaoCallbackPage = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (!code) return;

    const fetchToken = async () => {
      if (!code) return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-auth/kakao/code?code=${code}`,
          {
            method: "GET",
          },
        );

        if (res.status === 200) {
          const result: SigninResponse = await res.json();

          setUser(result.data.webUser);
          setAccessToken(result.data.accessToken);
          setRefreshToken(result.data.refreshToken);

          localStorage.removeItem("profile-form-data");

          const hasProfile = await checkHasWebProfile(result.data.accessToken);

          if (hasProfile) {
            router.replace("/");
          } else {
            router.replace("/profile/create/info");
          }
        } else {
          const error: ErrorResponse = await res.json();

          if (error.statusCode === 401) {
            console.error("유효하지 않은 인가코드 입력:", error.message);
          } else {
            console.error("로그인 실패:", error);
          }
        }
      } catch (err) {
        console.error(
          err instanceof Error ? err.message : "로그인 처리 중 오류 발생",
        );
      }
    };
    fetchToken();
  }, [router, setAccessToken, setRefreshToken, setUser]);

  return <div>카카오 로그인 처리 중</div>;
};

export default KakaoCallbackPage;
