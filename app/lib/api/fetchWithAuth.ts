import { useAuthStore } from "@/store/useAuthStore";
import { refreshTokens } from "./refreshAccessToken";

export const fetchWithAuth = async (url: string, options: RequestInit) => {
  const accessToken = useAuthStore.getState().accessToken;
  const refreshToken = useAuthStore.getState().refreshToken;

  let tokens = { accessToken, refreshToken };

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status !== 401) return res;

  try {
    tokens = await refreshTokens(); // token 갱신
    const retryRes = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    return retryRes;
  } catch (err) {
    useAuthStore.getState().resetAuth(); // 리프레시 실패 시 로그아웃 처리
    throw new Error("로그인이 만료되었습니다.");
  }
};
