import PostHeader from "@/app/components/post/PostHeader";
import PostDetailContent from "./PostDetailContent";
import PostDetailFooter from "./PostDetailFooter";
import { getRelativeTime } from "@/app/components/post/utils/getRelativeTime";
import Image from "next/image";
import { Board } from "@/app/(main)/hooks/useUserProfile";

interface PostDetailCardProps {
  post: Board;
}

const PostDetailCard = ({ post }: PostDetailCardProps) => {
  return (
    <div className="flex flex-col gap-3 border-b-[3px] border-border-secondary px-4 py-3">
      <PostHeader
        isMyProfile={post.isNeighbor === 4}
        post={post}
        isNeighbor={post.isNeighbor ?? 0}
      />
      <PostDetailContent content={post.content} />
      {post.images &&
        post.images.map((image, i) => (
          <div
            key={i}
            className="relativew-full max-w-[500px] overflow-hidden rounded-[8px]"
          >
            <Image
              src={image.includes("url") ? "/logos/symbol.svg" : image}
              alt={`${i}번 사진`}
              width={500}
              height={0}
              placeholder="blur"
              blurDataURL="/logos/symbol.svg"
              unoptimized
            />
          </div>
        ))}
      <PostDetailFooter
        postId={post.id}
        isLiked={post.isLiked === 1}
        likeCount={post.likeNumber || 0}
        createdAt={getRelativeTime(post.writtenAt)}
      />
    </div>
  );
};

export default PostDetailCard;
