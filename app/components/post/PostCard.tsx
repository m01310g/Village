import PostCardFooter from "./PostCardFooter";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";

interface PostCardProps {
  nickname: string;
  isMyProfile: boolean;
}

const PostCard = ({ nickname, isMyProfile }: PostCardProps) => {
  const postContent = `이번에 2차 구술까지 끝냈습니다! 예상보다 구술 질문이 실기보다 더 어렵네요ㅠ 자료 정리해서 공유합니다!`;

  return (
    <div className="flex flex-col gap-3 border-b border-border-secondary px-4 py-3">
      <PostHeader
        nickname={nickname}
        // 이웃 여부 검증 필요
        isNeighbor={false}
        isMyProfile={isMyProfile}
      />
      <PostContent content={postContent} />
      <PostCardFooter likeCount={2} commentCount={4} createdAt="12시간 전" />
    </div>
  );
};

export default PostCard;
