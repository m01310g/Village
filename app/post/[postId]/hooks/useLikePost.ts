import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";
import { ErrorResponse } from "@/app/types/ErrorResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const likePost = async (postId: number) => {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-community/like`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: postId }),
    },
  );

  if (!res.ok) {
    const error: ErrorResponse = await res.json();
    if (error.statusCode === 400) {
      throw new Error(`요청 형식 오류: ${error.message}`);
    } else if (error.statusCode === 401) {
      throw new Error(`유효하지 않거나 기간이 만료된 토큰: ${error.message}`);
    } else if (error.statusCode === 403) {
      throw new Error(`유저 회원이 아닙니다: ${error.message}`);
    } else if (error.statusCode === 404) {
      throw new Error(`등록된 프로필 없음: ${error.message}`);
    } else if (error.statusCode === 409) {
      throw new Error(`이미 좋아요를 누른 게시글: ${error.message}`);
    } else {
      throw new Error(error.message);
    }
  }
};

export const useLikePost = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => likePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postData", postId] });
    },
  });
};
