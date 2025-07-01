import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface EditPostType {
  id: number;
  type: 0 | 1 | 2;
  content: string;
  images: string[];
}

const editPost = async (formData: EditPostType) => {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-community/modifyBoard`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
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

    const result = await res.json();
    const data = result.data;
    return data;
  } catch (err) {
    throw new Error(
      err instanceof Error
        ? `게시글 등록 실패: ${err.message}`
        : `게시글 등록 실패: ${String(err)}`,
    );
  }
};

export const useEditPost = (formData: EditPostType) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      if (!formData) throw new Error("formData is required");
      return editPost(formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["postData", data.id] });
      router.replace(`/post/${data.id}`);
    },
  });
};
