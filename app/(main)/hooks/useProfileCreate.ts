import { ErrorResponse } from "@/app/types/ErrorResponse";
import { ProfileFormData } from "../types/profileFormData";
import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";
import { logSignUpEvent } from "@/app/lib/amplitude";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserProfile } from "./useUserProfile";
import { useRouter } from "next/navigation";

const createProfile = async (
  formData: ProfileFormData,
): Promise<UserProfile> => {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-profile/registerWebProfile`,
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
      } else if (error.statusCode === 409) {
        throw new Error(`이미 등록된 프로필이 있습니다: ${error.message}`);
      } else {
        throw new Error(error.message);
      }
    }
    const result = await res.json();
    return result.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "알 수 없는 오류");
  }
};

export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (formData: ProfileFormData) => createProfile(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      logSignUpEvent(data.id);
      router.push("/");
    },
  });
};
