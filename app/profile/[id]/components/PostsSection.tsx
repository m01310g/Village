import PostCard from "@/app/components/post/PostCard";

interface PostsSectionProps {
  nickname: string;
  isMyProfile: boolean;
}

const PostsSection = ({ nickname, isMyProfile }: PostsSectionProps) => {
  return (
    <>
      <h2 className="text-title-2 px-4 text-text-primary">작성한 글</h2>
      <PostCard
        nickname={isMyProfile ? nickname : "닉네임"}
        isMyProfile={isMyProfile}
      />
    </>
  );
};

export default PostsSection;
