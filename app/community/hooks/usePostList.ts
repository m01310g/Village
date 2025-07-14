import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { BoardListType } from "../types/boardListType";

const getPostList = async (
  isLoggedIn: boolean,
  page: number,
): Promise<BoardListType> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-community/getFeed?page=${page}`;
  const res = await (isLoggedIn
    ? fetchWithAuth(url, { method: "GET" })
    : fetch(url, { method: "GET" }));

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error);
  }

  const result = await res.json();
  const postList: BoardListType = result.data;

  return postList;
};

export const usePostList = (page: number) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn = !!accessToken;

  return useQuery({
    queryKey: ["postList", isLoggedIn, page],
    queryFn: () => getPostList(isLoggedIn, page),
    enabled: typeof window !== "undefined",
    staleTime: 0,
  });
};
