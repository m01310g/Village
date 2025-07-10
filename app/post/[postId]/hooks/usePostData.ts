import { useAuthStore } from "@/store/useAuthStore";
import { PostType } from "../../types/postType";
import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";

const getPostData = async (
  isLoggedIn: boolean,
  id: number,
): Promise<PostType> => {
  const res = await (isLoggedIn ? fetchWithAuth : fetch)(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-community/getBoard`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    },
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error);
  }

  const result = await res.json();
  const postData: PostType = result.data;

  return postData;
};

export const usePostData = (postId: number) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn = !!accessToken;

  return useQuery({
    queryKey: ["postData", postId, isLoggedIn],
    queryFn: () => {
      return getPostData(isLoggedIn, postId);
    },
  });
};
