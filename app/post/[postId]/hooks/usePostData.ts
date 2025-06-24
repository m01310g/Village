import { PostType } from "../../types/postType";
import { useQuery } from "@tanstack/react-query";

const getPostData = async (id: number): Promise<PostType> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-community/getBoard`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
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
