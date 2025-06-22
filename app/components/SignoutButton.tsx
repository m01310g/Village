"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { ErrorResponse } from "@/app/types/ErrorResponse";
import { useRouter } from "next/navigation";

interface SignoutResponse {
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

const SignoutButton = () => {
  const router = useRouter();
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const accessToken = useAuthStore((state) => state.accessToken);

  const handleSignout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-auth/signout`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        },
      );

      if (res.status === 200) {
        const data: SignoutResponse = await res.json();
        console.log(data.message);
        useAuthStore.getState().resetAuth();
        router.replace("/");
      } else {
        const error: ErrorResponse = await res.json();
        if (error.statusCode === 400) {
          console.error("요청 형식 오류:", error.message);
        } else if (error.statusCode === 401) {
          console.error("유효하지 않거나 기간이 만료된 토큰:", error.message);
        } else {
          console.error("로그아웃 실패:", error);
        }
      }
    } catch (err: any) {
      console.error(
        err instanceof Error ? err.message : "로그아웃 중 오류 발생",
      );
    }
  };

  return <button onClick={handleSignout}>로그아웃</button>;
};

export default SignoutButton;
