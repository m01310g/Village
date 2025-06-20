import Button from "@/app/components/Button";
import Header from "@/app/components/Header";
import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";

interface ProfileImageCropperProps {
  selectedImageUrl: string;
  setImage: (file: File) => void;
  onClose: () => void;
}

const ProfileImageCropper = ({
  selectedImageUrl,
  setImage,
  onClose,
}: ProfileImageCropperProps) => {
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
        <Button size="md" color="secondaryColor" onClick={onClose}>
          취소
        </Button>
        <Button
          size="md"
          color="primary"
          onClick={async (e) => {
            e.preventDefault();
            await getCroppedImage();
            onClose();
          }}
        >
          등록
        </Button>
      </footer>
    </div>
  );
};

export default ProfileImageCropper;
