import { useAuthStore } from "@/store/useAuthStore";
import { fetchWithAuth } from "./api/fetchWithAuth";
import { ErrorResponse } from "../types/ErrorResponse";

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

export const signoutUser = async (refreshToken: string) => {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-auth/signout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      },
    );

    if (res) {
      if (!res.ok) {
        const error: ErrorResponse = await res.json();
        if (error.statusCode === 400) {
          console.error("요청 형식 오류:", error.message);
        } else if (error.statusCode === 401) {
          console.error("유효하지 않거나 기간이 만료된 토큰:", error.message);
        } else {
          console.error("로그아웃 실패:", error);
        }
      }
      const data: SignoutResponse = await res.json();
      useAuthStore.getState().resetAuth();
      window.location.replace("/");
    } else {
      console.error("로그아웃 요청에 실패했습니다: 응답이 없습니다.");
    }
  } catch (err) {
    console.error(err instanceof Error ? err.message : "로그아웃 중 오류 발생");
  }
};
