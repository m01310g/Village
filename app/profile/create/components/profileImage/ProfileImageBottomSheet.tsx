"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/app/components/Header";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import Button from "@/app/components/Button";

interface ProfileImageBottomSheetProps {
  setImage: (file: File) => void;
  setIsBottomSheetOpen: (isOpen: boolean) => void;
}

const ProfileImageBottomSheet = ({
  setImage,
  setIsBottomSheetOpen,
}: ProfileImageBottomSheetProps) => {
  const [step, setStep] = useState<"select" | "gallery" | "camera" | "crop">(
    "select",
  );
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const getCroppedImage = async (): Promise<void> => {
    if (!selectedImageUrl || !croppedAreaPixels) return;

    const image = document.createElement("img");
    image.src = selectedImageUrl;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
    );

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `${selectedImageUrl}_cropped.jpeg`, {
          type: "image/jpeg",
        });
        setImage(file);
      }
    }, "image/jpeg");
  };

  const handleClose = () => {
    setIsBottomSheetOpen(false);
  };

  const renderContent = () => {
    switch (step) {
      case "camera":
        return (
          <div className="p-4">
            <h2 className="mb-2 text-lg font-semibold">사진 찍기</h2>
            <p className="text-sm text-gray-500">
              카메라 촬영 기능을 구현하세요.
            </p>
            <button
              className="mt-4 text-blue-500"
              onClick={() => setStep("crop")}
            >
              다음
            </button>
          </div>
        );
      case "crop":
        return (
          <div className="fixed inset-0 z-50 mx-auto flex max-w-[375px] flex-col bg-background-primary">
            <Header title="사진 자르기" showBackButton />
            <main className="relative flex-1">
              <Cropper
                image={selectedImageUrl}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                cropShape="rect"
                showGrid={false}
                cropSize={{ width: 300, height: 300 }}
                classes={{
                  containerClassName: "bg-neutral-950/45",
                }}
                style={{
                  cropAreaStyle: {
                    border: "2px solid #00C950",
                  },
                }}
              />
            </main>
            <footer className="flex items-center justify-center gap-[6px] px-4 py-5">
              <Button size="md" color="secondaryColor" onClick={handleClose}>
                취소
              </Button>
              <Button
                size="md"
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  getCroppedImage();
                  handleClose();
                }}
              >
                등록
              </Button>
            </footer>
          </div>
        );
      default:
        return (
          <div className="flex w-full flex-col gap-3 py-2">
            <h2 className="text-title-1 px-4 py-2 text-text-primary">
              사진 올리기
            </h2>
            <ul>
              <li
                className="h-[61px] cursor-pointer px-4 py-5"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                <div className="flex w-full justify-between text-left">
                  <span className="text-body-2">사진 보관함</span>
                  <Image
                    src={"/icons/chevron-right.svg"}
                    alt="사진 보관함"
                    width={20}
                    height={20}
                  />
                </div>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setSelectedImageUrl(imageUrl);
                      setStep("crop");
                    }
                  }}
                />
              </li>
              <div className="h-[1px] w-full bg-background-tertiary" />
              <li className="h-[61px] px-4 py-5">
                <button
                  className="flex w-full justify-between text-left"
                  onClick={() => setStep("camera")}
                >
                  <span className="text-body-2">사진 찍기</span>
                  <Image
                    src={"/icons/chevron-right.svg"}
                    alt="사진 보관함"
                    width={20}
                    height={20}
                  />
                </button>
              </li>
            </ul>
          </div>
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

export default ProfileImageBottomSheet;
