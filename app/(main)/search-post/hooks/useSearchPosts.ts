import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";

const fetchSearchPosts = async (
  keyword: string,
  page: number,
  isLoggedIn: boolean,
) => {
  const res = await (isLoggedIn ? fetchWithAuth : fetch)(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-community/search?page=${page}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword }),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const result = await res.json();
  const data = result.data;

  return data;
};

export const useSearchPosts = (keyword: string, page: number) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn = !!accessToken;
  return useQuery({
    queryKey: ["searchPosts", keyword],
    queryFn: () => fetchSearchPosts(keyword, page, isLoggedIn),
    enabled: !!keyword,
  });
};
