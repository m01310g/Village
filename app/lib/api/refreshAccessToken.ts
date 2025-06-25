import { ErrorResponse } from "@/app/types/ErrorResponse";
import { useAuthStore } from "@/store/useAuthStore";

export const refreshTokens = async (): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const refreshToken = useAuthStore.getState().refreshToken;
  console.log(refreshToken);
  if (!refreshToken) throw new Error("유효하지 않은 리프레시 토큰");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-auth/refresh`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    },
  );

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

  const result = await res.json();
  const data = result.data;

  useAuthStore.getState().setAccessToken(data.accessToken);
  useAuthStore.getState().setRefreshToken(data.refreshToken);

  const tokens = {
    refreshToken: data.refreshToken,
    accessToken: data.accessToken,
  };

  return tokens;
};
