import HeartIcon from "@/public/icons/icn_heart.svg";
import CommentIcon from "@/public/icons/icn_message-circle.svg";

interface PostCardFooterProps {
  likeCount: number;
  commentCount: number;
  createdAt: string;
  tag: number;
}

const tagLabelMap: { [key: number]: string } = {
  0: "업계이야기",
  1: "채용",
  2: "교육",
};

const PostCardFooter = ({
  likeCount,
  commentCount,
  createdAt,
  tag,
}: PostCardFooterProps) => {
  return (
    <footer className="flex items-center justify-between py-1">
      <div className="flex gap-[6px]">
        <div className="text-caption-2 flex gap-2 rounded-[4px] bg-neutral-50 p-1 text-text-tertiary">
          {tagLabelMap[tag]}
        </div>
        <div className="flex items-center justify-center gap-0.5">
          <HeartIcon color="#737373" width="16px" height="16px" />
          <span className="text-caption-3 leading-none text-text-tertiary">
            {likeCount}
          </span>
        </div>
        <div className="flex items-center justify-center gap-0.5">
          <CommentIcon color="#737373" width="16px" height="16px" />
          <span className="text-caption-3 leading-none text-text-tertiary">
            {commentCount}
          </span>
        </div>
      </div>
      <span className="text-caption-3 leading-none text-text-tertiary">
        {createdAt}
      </span>
    </footer>
  );
};

export default PostCardFooter;
