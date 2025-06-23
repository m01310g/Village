import { getRelativeTime } from "@/app/components/post/utils/getRelativeTime";
import CommentCard from "./CommentCard";

interface CommentsSectionProps {
  commentCount: number;
  comments: CommentType[];
}

const CommentsSection = ({ commentCount, comments }: CommentsSectionProps) => {
  return (
    <section>
      <header className="text-caption-3 px-4 py-3 text-text-secondary">
        댓글 <span>{commentCount}</span>
      </header>
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          nickname={comment.writtenBy.nickname}
          isNeighbor={false}
          profileImage={comment.writtenBy.profileImage}
          createdAt={getRelativeTime(comment.writtenAt)}
        />
      ))}
    </section>
  );
};

export default CommentsSection;
