import Image from "next/image";
import { useEffect, useState } from "react";
import EditIcon from "@/public/icons/icn_edit2.svg";
import ProfileImageUploader from "./ProfileImageUploader";
import useIsMobile from "@/app/lib/hooks/useIsMobile";

interface ProfileImageSectionProps {
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: (isOpen: boolean) => void;
  onClickOpen: () => void;
  onUploadSuccess: (url: string) => void;
  initialImage?: string;
}

const ProfileImageSection = ({
  isBottomSheetOpen,
  setIsBottomSheetOpen,
  onClickOpen,
  onUploadSuccess,
  initialImage,
}: ProfileImageSectionProps) => {
  const [image, setImage] = useState<string | null>(initialImage ?? null);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [step, setStep] = useState<"select" | "gallery" | "camera" | "crop">(
    "select",
  );
  const isMobile = useIsMobile();

  useEffect(() => {
    if (initialImage) {
      setImage(initialImage);
    }
  }, [initialImage]);

  return (
    <>
      <section className="flex items-center justify-center pb-3">
        <div className="relative flex h-[134px] w-[134px] items-center justify-center rounded-[4px] border border-border-primary">
          {image ? (
            <>
              <label
                htmlFor="profile-image-upload"
                className="absolute left-[102px] top-1 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-[69.3px] border border-white bg-background-brand"
                onClick={(e) => {
                  if (isMobile) {
                    e.preventDefault();
                    setStep("select");
                    onClickOpen();
                  }
                }}
              >
                {!isMobile && (
                  <input
                    id="profile-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
                <EditIcon color="white" width="18px" height="18px" />
              </label>
              <div className="relative flex h-[118px] w-[118px] items-center justify-center overflow-hidden rounded-[4px]">
                <Image
                  src={image}
                  alt="프로필 사진 미리보기"
                  width={118}
                  height={118}
                  unoptimized
                  priority
                />
              </div>
            </>
          ) : (
            <label
              className="flex h-[118px] w-[118px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[4px] bg-background-secondary"
              onClick={(e) => {
                if (isMobile) {
                  e.preventDefault();
                  setStep("select");
                  onClickOpen();
                }
              }}
            >
              {!isMobile && (
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
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
      {isBottomSheetOpen && (
        <ProfileImageUploader
          setImage={setImage}
          setIsBottomSheetOpen={setIsBottomSheetOpen}
          selectedImageUrl={selectedImageUrl}
          setSelectedImageUrl={setSelectedImageUrl}
          step={step}
          setStep={setStep}
          onUploadSuccess={onUploadSuccess}
        />
      )}
    </>
  );
};

export default ProfileImageSection;
