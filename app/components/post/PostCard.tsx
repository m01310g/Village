import { Board } from "@/app/profile/hooks/useUserProfile";
import PostCardFooter from "./PostCardFooter";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";
import { getRelativeTime } from "./utils/getRelativeTime";
import Link from "next/link";

interface PostCardProps {
  post: Board;
  isMyProfile: boolean;
}

const PostCard = ({ post, isMyProfile }: PostCardProps) => {
  return (
    <div className="flex cursor-pointer flex-col gap-3 border-b border-border-secondary px-4 py-3">
      <PostHeader
        nickname={post.writtenBy.nickname}
        profileImage={post.writtenBy.profileImage}
        // 이웃 여부 검증 필요
        isNeighbor={false}
        isMyProfile={isMyProfile}
      />
      <Link
        href={`/post/${post.id}`}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-3"
      >
        <PostContent content={post.content} />
        <PostCardFooter
          likeCount={post.likeNumber}
          commentCount={post.commentNumber}
          createdAt={getRelativeTime(post.writtenAt)}
        />
      </Link>
    </div>
  );
};

export default PostCard;
