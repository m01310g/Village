"use client";

import { Dispatch, SetStateAction } from "react";
import ProfileImageBottomSheet from "./ProfileImageBottomSheet";
import ProfileImageCropper from "./ProfileImageCropper";
import BottomSheetWrapper from "@/app/components/BottomSheetWrapper";

interface ProfileImageUploaderProps {
  setImage: (image: string) => void;
  setIsBottomSheetOpen: (isOpen: boolean) => void;
  selectedImageUrl: string;
  setSelectedImageUrl: (imgUrl: string) => void;
  step: string;
  setStep: Dispatch<SetStateAction<"select" | "gallery" | "camera" | "crop">>;
  onUploadSuccess: (url: string) => void;
}

const ProfileImageUploader = ({
  setImage,
  setIsBottomSheetOpen,
  selectedImageUrl,
  setSelectedImageUrl,
  step,
  setStep,
  onUploadSuccess,
}: ProfileImageUploaderProps) => {
  const handleClose = () => {
    setStep("select");
    setIsBottomSheetOpen(false);
  };

  const renderContent = () => {
    switch (step) {
      case "camera":
        return <div className="p-4">카메라 기능 구현 준비 중입니다.</div>;
      case "crop":
        return (
          <ProfileImageCropper
            selectedImageUrl={selectedImageUrl}
            setImage={(url) => {
              setImage(url);
              onUploadSuccess(url);
            }}
            onClose={handleClose}
            onUploadSuccess={onUploadSuccess}
          />
        );
      default:
        return (
          <ProfileImageBottomSheet
            setSelectedImageUrl={setSelectedImageUrl}
            setStep={setStep}
          />
        );
    }
  };

  return (
    <BottomSheetWrapper onClose={() => setIsBottomSheetOpen(false)}>
      {renderContent()}
    </BottomSheetWrapper>
  );
};

export default ProfileImageUploader;
