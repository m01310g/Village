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
    };
  };
}

interface CheckHasWebProfileResponse {
  message: string;
  statusCode: number;
  data: boolean;
}

import { useAuthStore } from "@/store/useAuthStore";
import { ErrorResponse } from "@/app/types/ErrorResponse";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const KakaoCallbackPage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const checkHasWebProfile = async (accessToken: string): Promise<boolean> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-profile/hasWebProfile`,

      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!res.ok) {
      const error: ErrorResponse = await res.json();
      if (error.statusCode === 401) {
        throw new Error(`유효하지 않거나 기간이 만료된 토큰: ${error.message}`);
      } else if (error.statusCode === 403) {
        throw new Error(`유저 회원이 아닙니다: ${error.message}`);
      } else {
        throw new Error(`프로필 보유 여부 확인 실패: ${error.message}`);
      }
    }

    const result: CheckHasWebProfileResponse = await res.json();
    return result.data;
  };

  useEffect(() => {
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
      } catch (err: any) {
        console.error(
          err instanceof Error ? err.message : "로그인 처리 중 오류 발생",
        );
      }
    };
    fetchToken();
  }, [code]);

  return <div>카카오 로그인 처리 중</div>;
};

export default KakaoCallbackPage;
