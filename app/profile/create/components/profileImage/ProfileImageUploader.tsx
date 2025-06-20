"use client";

import { Dispatch, SetStateAction, useState } from "react";
import ProfileImageBottomSheet from "./ProfileImageBottomSheet";
import ProfileImageCropper from "./ProfileImageCropper";

interface ProfileImageUploaderProps {
  setImage: (file: File) => void;
  setIsBottomSheetOpen: (isOpen: boolean) => void;
  selectedImageUrl: string;
  setSelectedImageUrl: (imgUrl: string) => void;
  step: string;
  setStep: Dispatch<SetStateAction<"select" | "gallery" | "camera" | "crop">>;
}

const ProfileImageUploader = ({
  setImage,
  setIsBottomSheetOpen,
  selectedImageUrl,
  setSelectedImageUrl,
  step,
  setStep,
}: ProfileImageUploaderProps) => {
  const handleClose = () => {
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
            setImage={setImage}
            onClose={handleClose}
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
    <div
      className="fixed inset-0 z-50 flex h-full items-end justify-center"
      onClick={handleClose}
    >
      <div className="absolute z-0 h-full w-full max-w-[375px] bg-neutral-950/45" />
      <div
        className="fixed bottom-0 z-50 w-full max-w-[375px] rounded-t-[20px] bg-background-primary py-5"
        onClick={(e) => e.stopPropagation()}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default ProfileImageUploader;
