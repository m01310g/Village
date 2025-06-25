import { useAuthStore } from "@/store/useAuthStore";
import { PostType } from "../../types/postType";
import { useQuery } from "@tanstack/react-query";

const getPostData = async (id: number): Promise<PostType> => {
  const accessToken = useAuthStore.getState().accessToken;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-community/getBoard`,
    {
      method: "POST",
      headers,
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
  return useQuery({
    queryKey: ["postData", postId],
    queryFn: () => {
      return getPostData(postId);
    },
  });
};
