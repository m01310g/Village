import HeartIcon from "@/public/icons/icn_heart.svg";
import clsx from "clsx";

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
  return (
    <div className="flex items-center justify-between">
      <div
        className={clsx(
          "text-caption-3 flex cursor-pointer items-center justify-center gap-1 rounded-[99px] border px-2 py-[6px]",
          isLiked
            ? "border-border-brand bg-background-brandSecondary text-text-onsecondary"
            : "border-border-secondary bg-background-primary text-text-tertiary",
        )}
      >
        <HeartIcon
          width="14px"
          height="14px"
          color={isLiked ? "#00a6f4" : "#737373"}
        />
        <span className="leading-none">좋아요</span>
        <span className="leading-none">{likeCount}</span>
      </div>
      <span className="text-caption-3 text-text-tertiary">{createdAt}</span>
    </div>
  );
};

export default PostDetailFooter;
