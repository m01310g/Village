import { ErrorResponse } from "@/app/types/ErrorResponse";
import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileFormData } from "../types/profileFormData";
import { useRouter } from "next/navigation";

const editProfile = async (formData: ProfileFormData) => {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-profile/modifyWebProfile`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
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
      } else {
        throw new Error(error.message);
      }
    }
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "프로필 수정 중 오류 발생",
    );
  }
};

export const useProfileEdit = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (formData: ProfileFormData) => editProfile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      router.push("/profile");
    },
    onError: (err) => {
      console.error("프로필 수정 실패:", err);
    },
  });
};
