import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";
import { Board } from "@/app/profile/hooks/useUserProfile";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";

const getPostList = async (isLoggedIn: boolean): Promise<Board[]> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-community/getFeed`;
  const res = await (isLoggedIn
    ? fetchWithAuth(url, { method: "GET" })
    : fetch(url, { method: "GET" }));

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error);
  }

  const result = await res.json();
  const postList: Board[] = result.data;

  return postList;
};

export const usePostList = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn = !!accessToken;

  return useQuery({
    queryKey: ["postList", isLoggedIn],
    queryFn: () => getPostList(isLoggedIn),
    enabled: typeof window !== "undefined",
  });
};
