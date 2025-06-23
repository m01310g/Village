import { Board } from "@/app/profile/hooks/useUserProfile";
import PostCardFooter from "./PostCardFooter";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";
import { getRelativeTime } from "./utils/getRelativeTime";

interface PostCardProps {
  post: Board;
  isMyProfile: boolean;
}

const PostCard = ({ post, isMyProfile }: PostCardProps) => {
  return (
    <div className="flex flex-col gap-3 border-b border-border-secondary px-4 py-3">
      <PostHeader
        nickname={post.writtenBy.nickname}
        // 이웃 여부 검증 필요
        isNeighbor={false}
        isMyProfile={isMyProfile}
      />
      <PostContent content={post.content} />
      <PostCardFooter
        likeCount={2}
        commentCount={4}
        createdAt={getRelativeTime(post.writtenAt)}
      />
    </div>
  );
};

export default PostCard;
