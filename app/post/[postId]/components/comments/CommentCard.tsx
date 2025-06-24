import PostContent from "@/app/components/post/PostContent";
import PostHeader from "@/app/components/post/PostHeader";
import CommentFooter from "./CommentFooter";

interface CommentCardProps {
  comment: CommentType;
  isMyProfile?: boolean;
  createdAt: string;
}

const CommentCard = ({ comment, isMyProfile, createdAt }: CommentCardProps) => {
  return (
    <div className="flex flex-col gap-3 border-b-[1px] border-border-secondary px-4 py-3">
      <PostHeader post={comment} isMyProfile={isMyProfile} />
      <PostContent content={comment.content} />
      <CommentFooter createdAt={createdAt} />
    </div>
  );
};

export default CommentCard;
