import PostContent from "@/app/components/post/PostContent";
import PostHeader from "@/app/components/post/PostHeader";
import CommentFooter from "./CommentFooter";
import { getRelativeTime } from "@/app/components/post/utils/getRelativeTime";

interface CommentCardProps {
  comment: CommentType;
  isMyProfile?: boolean;
}

const CommentCard = ({ comment, isMyProfile }: CommentCardProps) => {
  return (
    <div className="flex flex-col gap-3 border-b-[1px] border-border-secondary px-4 py-3">
      <PostHeader post={comment} isMyProfile={isMyProfile} />
      <PostContent content={comment.content} />
      <CommentFooter createdAt={getRelativeTime(comment.writtenAt)} />
    </div>
  );
};

export default CommentCard;
