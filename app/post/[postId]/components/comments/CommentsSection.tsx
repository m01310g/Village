import { useAuthStore } from "@/store/useAuthStore";
import CommentCard from "./CommentCard";
import { useEffect, useState } from "react";

interface CommentsSectionProps {
  commentCount: number;
  comments: CommentType[];
}

const CommentsSection = ({ commentCount, comments }: CommentsSectionProps) => {
  const user = useAuthStore.getState().user;
  const userId = user?.id;
  const [commentsList, setCommentsList] = useState<CommentType[]>([]);

  useEffect(() => {
    setCommentsList(comments);
  }, [comments]);

  return (
    <section>
      <header className="text-caption-3 px-4 py-3 text-text-secondary">
        댓글 <span>{commentCount}</span>
      </header>
      {commentsList.map((comment) => {
        const commentUserId = comment.writtenBy.id;
        const isMyProfile = commentUserId === userId! + 1;
        return (
          <CommentCard
            key={comment.id}
            comment={comment}
            setComments={setCommentsList}
            isMyProfile={isMyProfile}
          />
        );
      })}
    </section>
  );
};

export default CommentsSection;
