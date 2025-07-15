import { BoardProfile } from "@/app/(main)/hooks/useUserProfile";
import { useIsLoggedIn } from "@/app/hooks/useIsLoggedIn";
import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";
import { ErrorResponse } from "@/app/types/ErrorResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface SearchResultType extends BoardProfile {
  isNeighbor: number;
}

const searchProfile = async (
  keyword: string,
  isLoggedIn: boolean,
): Promise<SearchResultType[]> => {
  const res = isLoggedIn
    ? await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-profile/searchWebProfile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ keyword }),
        },
      )
    : await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-profile/searchWebProfile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ keyword }),
        },
      );

  if (!res.ok) {
    const error: ErrorResponse = await res.json();
    if (error.statusCode === 400) {
      console.error("데이터 형식 오류:", error.message);
    } else if (error.statusCode === 401) {
      console.error("유효하지 않거나 기간이 만료된 토큰:", error.message);
    } else {
      console.error("사용자 검색 실패:", error.message);
    }
  }

  const result = await res.json();

  return result.data;
};

export const useSearchProfile = (keyword: string) => {
  const queryClient = useQueryClient();
  const isLoggedIn = useIsLoggedIn();

  return useMutation({
    mutationFn: () => searchProfile(keyword, isLoggedIn),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["neighbors"] });
      queryClient.invalidateQueries({ queryKey: ["postList", isLoggedIn] });
    },
  });
};
