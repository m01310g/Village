import Image from "next/image";
import { useState } from "react";
import EditIcon from "@/public/icons/icn_edit2.svg";

const ProfileImageInput = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <section className="flex items-center justify-center pb-3">
      <div className="relative flex h-[134px] w-[134px] items-center justify-center rounded-[4px] border border-border-primary">
        {image && (
          <>
            <label
              htmlFor="profile-image-upload"
              className="absolute left-[102px] top-1 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-[69.3px] border border-white bg-background-brand"
            >
              <EditIcon color="white" width="18px" height="18px" />
            </label>
            <input
              id="profile-image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <div className="relative flex h-[118px] w-[118px] items-center justify-center overflow-hidden rounded-[4px]">
              <Image
                src={URL.createObjectURL(image)}
                alt="프로필 사진 미리보기"
                width={118}
                height={118}
                unoptimized
              />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </>
        )}
        {!image && (
          <label className="flex h-[118px] w-[118px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[4px] bg-background-secondary">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <Image
              src={"/icons/icn_img_plus.svg"}
              alt="프로필 사진 등록"
              width={24}
              height={24}
            />
            <span className="text-caption-2 text-neutral-600">
              프로필 사진 올리기
            </span>
          </label>
        )}
      </div>
    </section>
  );
};

export default ProfileImageInput;
