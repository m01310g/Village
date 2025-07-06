import { useAuthStore } from "@/store/useAuthStore";
import CommentCard from "./CommentCard";
import { useEffect, useState } from "react";
import { CommentType } from "./types/commentType";

interface CommentsSectionProps {
  comments: CommentType[];
}

const CommentsSection = ({ comments }: CommentsSectionProps) => {
  const userId = useAuthStore((state) => state.user?.webProfileId);
  const [commentsList, setCommentsList] = useState<CommentType[]>([]);

  useEffect(() => {
    setCommentsList(comments);
  }, [comments]);

  return (
    <section>
      <header className="text-caption-3 px-4 py-3 text-text-secondary">
        댓글 <span>{commentsList.length}</span>
      </header>
      {commentsList.map((comment) => {
        const commentUserId = comment.writtenBy.id;
        const isMyProfile = commentUserId === userId;
        return (
          <CommentCard
            key={comment.id}
            comment={comment}
            isMyProfile={isMyProfile}
            setComments={setCommentsList}
          />
        );
      })}
    </section>
  );
};

export default CommentsSection;
