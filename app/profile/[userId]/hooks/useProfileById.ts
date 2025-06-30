import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";
import { ErrorResponse } from "@/app/types/ErrorResponse";
import { UserProfile } from "../../hooks/useUserProfile";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const getProfileById = async (userId: number): Promise<UserProfile> => {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-profile/getWebProfile`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    },
  );

  if (!res.ok) {
    const error: ErrorResponse = await res.json();

    if (error.statusCode === 400) {
      throw new Error(`데이터 형식 오류: ${error.message}`);
    } else if (error.statusCode === 401) {
      throw new Error(`유효하지 않거나 기간이 만료된 토큰: ${error.message}`);
    } else if (error.statusCode === 404) {
      throw new Error(`해당 ID의 사용자가 없음: ${error.message}`);
    }
  }

  const result = await res.json();
  return result.data;
};

export const useProfileById = (userId: number) => {
  return useQuery({
    queryKey: ["profileById", userId],
    queryFn: () => getProfileById(userId),
  });
};
