import Image from "next/image";
import { useEffect, useRef } from "react";

interface PostImagesItemProps {
  images: string[];
}

const PostImagesItem = ({ images }: PostImagesItemProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className="scrollbar-none flex h-[100px] min-h-[100px] w-full gap-1 overflow-x-auto"
    >
      {images.map((image, i) => (
        <div
          key={i}
          className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-[8px]"
        >
          <Image
            src={image}
            alt={`${i}번 사진`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default PostImagesItem;
