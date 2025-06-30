import React, { useState } from "react";
import ImageIcon from "@/public/icons/icn_image-03.svg";
import { ErrorResponse } from "@/app/types/ErrorResponse";
import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";
import ModalWrapper from "@/app/components/modal/ModalWrapper";
import Button from "@/app/components/Button";

interface PostCreateFooterProps {
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  imageCount: number;
}

const PostCreateFooter = ({ setImages, imageCount }: PostCreateFooterProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files);

    if (selectedFiles.length + imageCount > 10) {
      setIsModalOpen(true);
      return;
    }

    const validFiles = selectedFiles.filter((file) => {
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

      const res = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-community/uploadBoardImage`,
        {
          headers: {},
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
    } catch (err) {
      console.error(
        err instanceof Error
          ? `이미지 업로드 실패: ${err.message}`
          : "이미지 업로드에 실패했습니다.",
      );
    }
  };

  return (
    <>
      <footer className="flex w-full items-center border-t-[1px] border-border-primary px-4 py-1">
        <label className="cursor-pointer p-1.5">
          <ImageIcon width="24px" height="24px" color="#737373" />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageSelect}
            onClick={(e) => {
              if (imageCount >= 10) {
                e.preventDefault();
                setIsModalOpen(true);
              }
            }}
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
      {isModalOpen && (
        <ModalWrapper onClose={() => setIsModalOpen(false)}>
          <span className="text-title-3 text-text-primary">
            사진은 최대 10장까지만 업로드할 수 있습니다.
          </span>
          <Button
            size="md"
            color="primary"
            onClick={() => setIsModalOpen(false)}
          >
            확인
          </Button>
        </ModalWrapper>
      )}
    </>
  );
};

export default PostCreateFooter;
