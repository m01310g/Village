import PostContent from "@/app/components/post/PostContent";
import PostHeader from "@/app/components/post/PostHeader";
import CommentFooter from "./CommentFooter";

interface CommentCardProps {
  profileImage?: string;
  nickname: string;
  isNeighbor: boolean;
  isMyProfile?: boolean;
  createdAt: string;
}

const CommentCard = ({
  profileImage,
  nickname,
  isNeighbor,
  isMyProfile,
  createdAt,
}: CommentCardProps) => {
  return (
    <div className="flex flex-col gap-3 border-b-[1px] border-border-secondary px-4 py-3">
      <PostHeader
        profileImage={profileImage}
        nickname={nickname}
        isNeighbor={isNeighbor}
        isMyProfile={isMyProfile}
      />
      <PostContent content="멋져용" />
      <CommentFooter createdAt={createdAt} />
    </div>
  );
};

export default CommentCard;
