import PostHeader from "@/app/components/post/PostHeader";
import PostDetailContent from "./PostDetailContent";
import PostDetailFooter from "./PostDetailFooter";
import { Board } from "@/app/profile/hooks/useUserProfile";
import { getRelativeTime } from "@/app/components/post/utils/getRelativeTime";

interface PostDetailCardProps {
  post: Board;
}

const PostDetailCard = ({ post }: PostDetailCardProps) => {
  return (
    <div className="flex flex-col gap-3 border-b-[3px] border-border-secondary px-4 py-3">
      <PostHeader
        nickname={post.writtenBy.nickname}
        isNeighbor={false}
        profileImage={post.writtenBy.profileImage}
        isMyProfile={false}
      />
      <PostDetailContent content={post.content} />
      <PostDetailFooter
        likeCount={post.likeNumber}
        createdAt={getRelativeTime(post.writtenAt)}
      />
    </div>
  );
};

export default PostDetailCard;
