import { Board } from "@/app/profile/hooks/useUserProfile";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const getPostList = async (): Promise<Board[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-community/getFeed`,
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error);
  }

  const result = await res.json();
  const postList: Board[] = result.data;

  return postList;
};

export const usePostList = () => {
  return useQuery({
    queryKey: ["postList"],
    queryFn: getPostList,
  });
};
