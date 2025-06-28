import { ErrorResponse } from "@/app/types/ErrorResponse";

interface CheckHasWebProfileResponse {
  message: string;
  statusCode: number;
  data: boolean;
}

export const checkHasWebProfile = async (
  accessToken: string,
): Promise<boolean> => {
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
