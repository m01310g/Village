"use client";

import FilteringButton from "@/app/components/feed/FilteringButton";
import { useSetHeader } from "@/app/components/header/HeaderContext";
import React, { useEffect, useState } from "react";
import ContentTextarea from "./components/ContentTextarea";
import PostCreateFooter from "./components/PostCreateFooter";
import SelectedImagesSection from "./components/SelectedImagesSection";
import { useAuthStore } from "@/store/useAuthStore";
import { ErrorResponse } from "@/app/types/ErrorResponse";

const PostCreatePage = () => {
  const setHeader = useSetHeader();
  const [isActive, setIsActive] = useState("업계정보");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const accessToken = useAuthStore((state) => state.accessToken);
  const types = ["업계정보", "채용", "교육"];

  useEffect(() => {
    const createButtonProps = {
      className:
        content.trim().length > 0
          ? "text-text-onsecondary"
          : "text-text-disabled",
      disabled: content.trim().length === 0,
    };

    setHeader({
      title: "빌리지",
      showBackButton: true,
      showCreateButton: true,
      showCreateButtonProps: createButtonProps,
    });
  }, [setHeader, content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleImageSelect = async (selectedImages: File[]) => {
    try {
      const formData = new FormData();
      selectedImages.forEach((image) => formData.append("images", image));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-community/uploadBoardImage`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          method: "POST",
          body: formData,
        },
      );

      if (!res.ok) {
        const error: ErrorResponse = await res.json();
        if (error.statusCode === 401) {
          throw new Error(
            `유효하지 않거나 기간이 만료된 토큰: ${error.message}`,
          );
        } else if (error.statusCode === 403) {
          throw new Error(`유저 회원이 아닙니다: ${error.message}`);
        } else {
          throw new Error(`게시글 사진 업로드 실패: ${error.message}`);
        }
      }

      const result = await res.json();
      const data = result.data;
      setImages((prev) => [...prev, ...data]);
    } catch (err: any) {
      console.error(
        err instanceof Error
          ? `이미지 업로드 실패: ${err.message}`
          : "이미지 업로드에 실패했습니다.",
      );
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex h-full max-w-[375px] flex-col overflow-hidden">
      <div className="flex flex-grow flex-col gap-5 px-4 py-3">
        <div className="border-b-[1px] border-border-primary pb-3">
          {types.map((type, i) => (
            <FilteringButton
              key={i}
              content={type}
              onClick={() => {
                setIsActive(type);
              }}
              isActive={isActive === type}
            />
          ))}
        </div>
        <ContentTextarea
          content={content}
          onChange={handleChange}
          images={images}
          onRemoveImages={handleRemoveImage}
        />
      </div>

      <PostCreateFooter
        onImageSelect={handleImageSelect}
        imageCount={images.length}
      />
    </div>
  );
};

export default PostCreatePage;
