import React from "react";
import CameraIcon from "@/public/icons/icn_camera-01.svg";
import ImageIcon from "@/public/icons/icn_image-03.svg";

interface PostCreateFooterProps {
  onImageSelect: (image: File[]) => void;
  imageCount: number;
}

const PostCreateFooter = ({
  onImageSelect,
  imageCount,
}: PostCreateFooterProps) => {
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    console.log("선택된 유효 이미지 파일들:", validFiles);
    onImageSelect(validFiles);
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
