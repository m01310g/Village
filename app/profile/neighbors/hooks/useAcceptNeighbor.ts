import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";
import { ErrorResponse } from "@/app/types/ErrorResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const acceptNeighbor = async (id: number) => {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-profile/acceptNeighbor`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
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
    } else if (error.statusCode === 409) {
      throw new Error(`이웃 신청을 받지 않은 사용자: ${error.message}`);
    } else {
      throw new Error(error.message);
    }
  }
};

export const useAcceptNeighbor = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => acceptNeighbor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["neighbors", id] });
    },
  });
};
