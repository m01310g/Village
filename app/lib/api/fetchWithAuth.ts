import { useAuthStore } from "@/store/useAuthStore";
import { refreshTokens } from "./refreshAccessToken";
import { signoutUser } from "../signoutUser";

export const fetchWithAuth = async (
  url: string,
  options: RequestInit,
): Promise<Response | undefined> => {
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

  if (res.status === 401) {
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
      console.error("로그인이 만료되었습니다.");
    }
    signoutUser(refreshToken!);
    return undefined;
  }
};
