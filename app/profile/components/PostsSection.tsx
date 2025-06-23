import PostCard from "@/app/components/post/PostCard";
import { Board } from "../hooks/useUserProfile";

interface PostsSectionProps {
  nickname: string;
  posts: Board[];
  isMyProfile: boolean;
}

const PostsSection = ({ posts, isMyProfile }: PostsSectionProps) => {
  return (
    <>
      <h2 className="text-title-2 px-4 text-text-primary">작성한 글</h2>
      {posts.map((post) => {
        <PostCard key={post.id} post={post} isMyProfile={isMyProfile} />;
      })}
    </>
  );
};

export default PostsSection;
