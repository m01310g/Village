import CommentFooter from "./CommentFooter";
import { getRelativeTime } from "@/app/components/post/utils/getRelativeTime";
import CommentHeader from "./CommentHeader";
import { Dispatch, SetStateAction } from "react";
import { CommentType } from "./types/commentType";
import CommetnContent from "./CommentContent";

interface CommentCardProps {
  comment: CommentType;
  isMyProfile: boolean;
  setComments: Dispatch<SetStateAction<CommentType[]>>;
}

const CommentCard = ({
  comment,
  isMyProfile,
  setComments,
}: CommentCardProps) => {
  return (
    <div className="flex flex-col gap-3 border-b-[1px] border-border-secondary px-4 py-3">
      <CommentHeader
        comment={comment}
        isMyProfile={isMyProfile}
        setComments={setComments}
      />
      <CommetnContent content={comment.content} />
      <CommentFooter createdAt={getRelativeTime(comment.writtenAt)} />
    </div>
  );
};

export default CommentCard;
