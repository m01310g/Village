import React from "react";
import CameraIcon from "@/public/icons/icn_camera-01.svg";
import ImageIcon from "@/public/icons/icn_image-03.svg";
import { ErrorResponse } from "@/app/types/ErrorResponse";

interface PostCreateFooterProps {
  accessToken: string;
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  imageCount: number;
}

const PostCreateFooter = ({
  accessToken,
  setImages,
  imageCount,
}: PostCreateFooterProps) => {
  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const validFiles = Array.from(files).filter((file) => {
      if (file.size <= 5 * 1024 * 1024) {
        return true;
      } else {
        console.warn(`${file.name}은(는) 5MB를 초과하여 제외됩니다.`);
        return false;
      }
    });

    try {
      const formData = new FormData();
      validFiles.forEach((file) => formData.append("images", file));

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

  return (
    <footer className="flex w-full items-center border-t-[1px] border-border-primary px-4 py-1">
      <button className="cursor-pointer p-1.5">
        <CameraIcon width="24px" height="24px" color="#737373" />
      </button>
      <label className="cursor-pointer p-1.5">
        <ImageIcon width="24px" height="24px" color="#737373" />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageSelect}
          className="hidden"
          max={10}
        />
      </label>
      {imageCount > 0 && (
        <span className="text-caption-3 text-text-tertiary">
          {imageCount}/10
        </span>
      )}
    </footer>
  );
};

export default PostCreateFooter;
