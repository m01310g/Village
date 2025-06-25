import HeartIcon from "@/public/icons/icn_heart.svg";
import clsx from "clsx";
import { useState } from "react";

interface PostDetailFooterProps {
  isLiked?: boolean;
  likeCount: number;
  createdAt: string;
}

const PostDetailFooter = ({
  isLiked = false,
  likeCount,
  createdAt,
}: PostDetailFooterProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [count, setCount] = useState(likeCount);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="flex items-center justify-between">
      <button
        className={clsx(
          "text-caption-3 flex cursor-pointer items-center justify-center gap-1 rounded-[99px] border px-2 py-[6px]",
          liked
            ? "border-border-brand bg-background-brandSecondary text-text-onsecondary"
            : "border-border-secondary bg-background-primary text-text-tertiary",
        )}
        onClick={handleLike}
      >
        <HeartIcon
          width="14px"
          height="14px"
          color={liked ? "#00a6f4" : "#737373"}
        />
        <span className="leading-none">좋아요</span>
        <span className="leading-none">{count}</span>
      </button>
      <span className="text-caption-3 text-text-tertiary">{createdAt}</span>
    </div>
  );
};

export default PostDetailFooter;
