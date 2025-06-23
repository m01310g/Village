import { Board } from "@/app/profile/hooks/useUserProfile";
import PostCardFooter from "./PostCardFooter";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";
import { getRelativeTime } from "./utils/getRelativeTime";
import { useRouter } from "next/navigation";

interface PostCardProps {
  post: Board;
  isMyProfile: boolean;
}

const PostCard = ({ post, isMyProfile }: PostCardProps) => {
  const router = useRouter();

  return (
    <div
      className="flex cursor-pointer flex-col gap-3 border-b border-border-secondary px-4 py-3"
      onClick={() => router.push(`/post/${post.id}`)}
    >
      <PostHeader
        nickname={post.writtenBy.nickname}
        profileImage={post.writtenBy.profileImage}
        // 이웃 여부 검증 필요
        isNeighbor={false}
        isMyProfile={isMyProfile}
      />
      <PostContent content={post.content} />
      <PostCardFooter
        likeCount={post.likeNumber}
        commentCount={post.commentNumber}
        createdAt={getRelativeTime(post.writtenAt)}
      />
    </div>
  );
};

export default PostCard;
