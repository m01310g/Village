import Image from "next/image";
import CloseIcon from "@/public/icons/close-2.svg";
import clsx from "clsx";

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
      className="flex h-[112px] min-h-[112px] w-full max-w-[375px] gap-1 overflow-x-auto"
      style={{ scrollbarWidth: "thin", msOverflowStyle: "none" }}
    >
      {images.map((image, i) => (
        <div
          className={clsx(
            "relative h-[100px] w-[100px] min-w-[100px] flex-none overflow-hidden rounded-[8px]",
            i === 0 ? "ml-4" : i === images.length - 1 ? "mr-4" : "",
          )}
          key={i}
        >
          <Image
            src={image}
            alt={`${i}번 사진 미리보기`}
            fill
            className="object-cover"
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
