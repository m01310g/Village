import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteComment = async (commentId: number, accessToken: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-community/deleteComment`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: commentId }),
    },
  );

  if (!res.ok) {
    const error = await res.json();
    if (error.statusCode === 400) {
      throw new Error(`요청 형식 오류: ${error.message}`);
    } else if (error.statusCode === 401) {
      throw new Error(`유효하지 않거나 기간이 만료된 토큰: ${error.message}`);
    } else if (error.statusCode === 403) {
      throw new Error(`유저 회원이 아닙니다: ${error.message}`);
    } else if (error.statusCode === 404) {
      throw new Error(`등록된 프로필 없음: ${error.message}`);
    } else {
      throw new Error(error.message);
    }
  }
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const accessToken = useAuthStore.getState().accessToken;

  return useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId, accessToken!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};
