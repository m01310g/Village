import Image from "next/image";
import CloseIcon from "@/public/icons/close-2.svg";

interface SelectedImagesSectionProps {
  images: string[];
  onRemoveImage: (idx: number) => void;
}

const SelectedImagesSection = ({
  images,
  onRemoveImage,
}: SelectedImagesSectionProps) => {
  return (
    <section
      className="flex h-[112px] min-h-[112px] w-full max-w-[500px] gap-1 overflow-x-auto"
      style={{ scrollbarWidth: "thin", msOverflowStyle: "none" }}
    >
      {images.map((image, i) => (
        <div
          className="relative h-[100px] w-[100px] min-w-[100px] flex-none overflow-hidden rounded-[8px]"
          key={i}
        >
          <Image
            src={image}
            alt={`${i}번 사진 미리보기`}
            fill
            sizes="100px"
            className="object-cover"
            unoptimized
          />
          <button
            className="absolute right-1 top-1 h-5 w-5 rounded-[832.5px] bg-neutral-900/40"
            onClick={() => onRemoveImage(i)}
          >
            <CloseIcon width="20px" height="20px" color="#FFFFFF" />
          </button>
        </div>
      ))}
    </section>
  );
};

export default SelectedImagesSection;
