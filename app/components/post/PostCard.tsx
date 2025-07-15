import PostCardFooter from "./PostCardFooter";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";
import { getRelativeTime } from "./utils/getRelativeTime";
import Link from "next/link";
import PostImagesItem from "./PostImagesItem";
import { Board } from "@/app/(main)/hooks/useUserProfile";

interface PostCardProps {
  post: Board;
  isMyProfile: boolean;
}

const PostCard = ({ post, isMyProfile }: PostCardProps) => {
  return (
    <div className="flex cursor-pointer flex-col gap-3 border-b border-border-secondary px-4 py-3">
      <PostHeader
        post={post}
        isMyProfile={isMyProfile}
        isNeighbor={post.isNeighbor ?? 0}
      />
      <Link
        href={`/post/${post.id}`}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-3"
      >
        <PostContent content={post.content} />
        {post.images && post.images?.length > 0 && (
          <PostImagesItem images={post.images} />
        )}
        <PostCardFooter
          likeCount={post.likeNumber || 0}
          commentCount={post.commentNumber || 0}
          createdAt={getRelativeTime(post.writtenAt)}
          tag={post.type || 0}
        />
      </Link>
    </div>
  );
};

export default PostCard;
