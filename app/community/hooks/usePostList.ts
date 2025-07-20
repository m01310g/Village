import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BoardListType } from "../types/boardListType";
import { useIsLoggedIn } from "@/app/hooks/useIsLoggedIn";

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

export const usePostList = () => {
  const { isLoggedIn } = useIsLoggedIn();

  return useInfiniteQuery({
    queryKey: ["postList", isLoggedIn],
    queryFn: ({ pageParam = 1 }) => getPostList(isLoggedIn, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.isLastPage ? undefined : allPages.length + 1;
    },
    initialPageParam: 1,
    enabled: typeof window !== "undefined",
    staleTime: 0,
  });
};
