import PostHeader from "@/app/components/post/PostHeader";
import PostDetailContent from "./PostDetailContent";
import PostDetailFooter from "./PostDetailFooter";
import { Board } from "@/app/profile/hooks/useUserProfile";
import { getRelativeTime } from "@/app/components/post/utils/getRelativeTime";
import Image from "next/image";

interface PostDetailCardProps {
  post: Board;
}

const PostDetailCard = ({ post }: PostDetailCardProps) => {
  return (
    <div className="flex flex-col gap-3 border-b-[3px] border-border-secondary px-4 py-3">
      <PostHeader isMyProfile={false} post={post} />
      <PostDetailContent content={post.content} />
      {post.images &&
        post.images.map((image, i) => (
          <div
            key={i}
            className="w-full max-w-[375px] overflow-hidden rounded-[8px]"
          >
            <Image
              src={image}
              alt={`${i}번 사진`}
              width={375}
              height={375}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        ))}
      <PostDetailFooter
        likeCount={post.likeNumber}
        createdAt={getRelativeTime(post.writtenAt)}
      />
    </div>
  );
};

export default PostDetailCard;
