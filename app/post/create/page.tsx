"use client";

import { useSetHeader } from "@/app/components/header/HeaderContext";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PostForm from "../[postId]/components/PostForm";
import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";

const PostCreatePage = () => {
  const setHeader = useSetHeader();
  const [isActive, setIsActive] = useState<keyof typeof typeMap>("업계이야기");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const typeMap = { 업계이야기: 0, 채용: 1, 교육: 2 } as const;
  const router = useRouter();

  const handleSubmit = useCallback(async () => {
    const formData = { type: typeMap[isActive], content, images };
    try {
      const res = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-community/registerBoard`,
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
    } catch (err) {
      console.error(
        err instanceof Error ? `게시글 등록 실패: ${err.message}` : err,
      );
    }
  }, [router, typeMap, isActive, content, images]);

  useEffect(() => {
    const createButtonProps = {
      className:
        content.trim().length > 0
          ? "text-text-onsecondary"
          : "text-text-disabled",
      disabled: content.trim().length === 0,
      label: "게시",
    };

    setHeader({
      title: "빌리지",
      showBackButton: true,
      showCreateButton: true,
      showCreateButtonProps: createButtonProps,
      onClick: handleSubmit,
    });
  }, [setHeader, content, handleSubmit]);

  return (
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

export default PostCreatePage;
