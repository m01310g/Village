import { getRelativeTime } from "@/app/components/post/utils/getRelativeTime";
import CommentCard from "./CommentCard";

interface CommentsSectionProps {
  commentCount: number;
  comments: CommentType[];
}

const CommentsSection = ({ commentCount, comments }: CommentsSectionProps) => {
  console.log(comments);
  return (
    <section>
      <header className="text-caption-3 px-4 py-3 text-text-secondary">
        댓글 <span>{commentCount}</span>
      </header>
      {comments.map((comment, i) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </section>
  );
};

export default CommentsSection;
