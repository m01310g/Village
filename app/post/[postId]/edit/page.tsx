"use client";

import { useSetHeader } from "@/app/components/header/HeaderContext";
import { useCallback, useEffect, useState } from "react";
import { usePostData } from "../hooks/usePostData";
import { useParams, useRouter } from "next/navigation";
import PostForm from "../components/PostForm";
import { useAuthStore } from "@/store/useAuthStore";
import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";

const PostEditPage = () => {
  const setHeader = useSetHeader();
  const params = useParams();
  const postId = Number(params.postId);
  const [isActive, setIsActive] = useState<"업계이야기" | "채용" | "교육">(
    "업계이야기",
  );
  const [content, setContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [originalImages, setOriginalImages] = useState<string[]>([]);
  const accessToken = useAuthStore.getState().accessToken;
  const typeMap = { 업계이야기: 0, 채용: 1, 교육: 2 } as const;
  const router = useRouter();

  const { data: postData, isLoading, error } = usePostData(postId);

  const types = ["업계이야기", "채용", "교육"];

  const arraysAreEqual = (a: string[], b: string[]) => {
    if (a.length !== b.length) return false;
    return a.every((val, idx) => val === b[idx]);
  };

  const handleEdit = useCallback(async () => {
    const formData = {
      id: postData!.id,
      type: typeMap[isActive],
      content,
      images,
    };

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
          throw new Error(
            `유효하지 않거나 기간이 만료된 토큰: ${error.message}`,
          );
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

      router.replace(`/post/${data.id}`);
    } catch (err: any) {
      console.error(
        err instanceof Error ? `게시글 등록 실패: ${err.message}` : err,
      );
    }
  }, [accessToken, isActive, content, images, postData]);

  useEffect(() => {
    if (postData) {
      if (typeof postData.type === "number") {
        setIsActive(types[postData.type] as "업계이야기" | "채용" | "교육");
      }
      setContent(postData.content);
      setImages(postData.images || []);
      setOriginalContent(postData.content);
      setOriginalImages(postData.images || []);
    }
  }, [postData]);

  useEffect(() => {
    const isContentChanged = content !== originalContent;
    const isImagesChanged = !arraysAreEqual(images, originalImages);
    const isChanged = isContentChanged || isImagesChanged;

    const editButtonProps = {
      className: isChanged ? "text-text-onsecondary" : "text-text-disabled",
      disabled: !isChanged,
      label: "수정",
    };

    setHeader({
      title: "빌리지",
      showBackButton: true,
      showCreateButton: true,
      showCreateButtonProps: editButtonProps,
      onClick: handleEdit,
    });
  }, [setHeader, content, originalContent, originalImages, images, handleEdit]);

  return isLoading || !postData ? (
    <div>로딩중...</div>
  ) : (
    <PostForm
      isActive={isActive}
      setIsActive={setIsActive}
      content={content}
      setContent={setContent}
      images={images}
      setImages={setImages}
    />
  );
};

export default PostEditPage;
