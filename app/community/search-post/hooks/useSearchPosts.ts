import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { BoardListType } from "../../types/boardListType";
import { ErrorResponse } from "@/app/types/ErrorResponse";

const fetchSearchPosts = async (
  keyword: string,
  page: number,
  isLoggedIn: boolean,
): Promise<BoardListType> => {
  const res = await (isLoggedIn ? fetchWithAuth : fetch)(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-community/search?page=${page}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keywords: keyword }),
    },
  );

  if (!res.ok) {
    const error: ErrorResponse = await res.json();
    if (error.statusCode === 400) {
      throw new Error(`해당 페이지의 게시글이 없습니다: ${error.message}`);
    } else if (error.statusCode === 401) {
      throw new Error(`유효하지 않거나 기간이 만료된 토큰: ${error.message}`);
    }
  }

  const result = await res.json();
  const data: BoardListType = result.data;

  return data;
};

export const useSearchPosts = (keyword: string, page: number) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn = !!accessToken;
  return useQuery({
    queryKey: ["searchPosts", keyword, page],
    queryFn: () => fetchSearchPosts(keyword, page, isLoggedIn),
    enabled: !!keyword,
    retry: false,
  });
};
