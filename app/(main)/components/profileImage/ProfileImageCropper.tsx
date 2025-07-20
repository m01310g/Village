import Header from "@/app/components/header/Header";
import { useEffect, useRef, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import ProfileImageFooter from "./ProfileImageFooter";

interface ProfileImageCropperProps {
  selectedImageUrl: string;
  setImage: (image: string) => void;
  onClose: () => void;
  onUploadSuccess: (url: string) => void;
}

const ProfileImageCropper = ({
  selectedImageUrl,
  setImage,
  onClose,
  onUploadSuccess,
}: ProfileImageCropperProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [minZoom, setMinZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const image = new Image();
    image.src = selectedImageUrl;

    image.onload = () => {
      const imgWidth = image.naturalWidth;
      const imgHeight = image.naturalHeight;

      const containerWidth = containerRef.current?.offsetWidth ?? 500;
      const containerHeight = containerRef.current?.offsetHeight ?? 666;

      const imageAspectRatio = imgWidth / imgHeight;
      const containerAspectRatio = containerWidth / containerHeight;

      let renderedWidth, renderedHeight;

      if (imageAspectRatio > containerAspectRatio) {
        renderedWidth = containerWidth;
        renderedHeight = containerWidth / imageAspectRatio;
      } else {
        renderedHeight = containerHeight;
        renderedWidth = containerHeight * imageAspectRatio;
      }

      const shorterRenderedSide = Math.min(renderedWidth, renderedHeight);
      const zoomRatio = shorterRenderedSide / 300;
      const initialZoom = 1 / zoomRatio;

      setZoom(initialZoom);
      setMinZoom(initialZoom);
    };
  }, [selectedImageUrl]);

  return (
    <div className="fixed inset-0 z-50 mx-auto flex max-w-[500px] flex-col bg-background-primary">
      <Header title="사진 자르기" showBackButton />
      <main className="relative flex-1" ref={containerRef}>
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
          minZoom={minZoom}
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
      <ProfileImageFooter
        onClose={onClose}
        croppedAreaPixels={croppedAreaPixels!}
        selectedImageUrl={selectedImageUrl}
        setImage={setImage}
        onUploadSuccess={onUploadSuccess}
      />
    </div>
  );
};

export default ProfileImageCropper;
