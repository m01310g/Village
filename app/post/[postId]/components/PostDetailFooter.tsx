import HeartIcon from "@/public/icons/icn_heart.svg";
import clsx from "clsx";
import { useState } from "react";
import { useLikePost } from "../hooks/useLikePost";
import { useUnlikePost } from "../hooks/useUnlikePost";
import { useAuthStore } from "@/store/useAuthStore";
import ModalWrapper from "@/app/components/modal/ModalWrapper";
import Button from "@/app/components/Button";

interface PostDetailFooterProps {
  postId: number;
  isLiked: boolean;
  likeCount: number;
  createdAt: string;
}

const PostDetailFooter = ({
  postId,
  isLiked,
  likeCount,
  createdAt,
}: PostDetailFooterProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [count, setCount] = useState(likeCount);
  const likeMutation = useLikePost(postId);
  const unlikeMutation = useUnlikePost(postId);
  const accessToken = useAuthStore.getState().accessToken;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLike = () => {
    if (!accessToken) {
      setIsModalOpen(true);
      return;
    }
    setLiked((prev) => !prev);
    setCount((prev) => (liked ? prev - 1 : prev + 1));
    if (liked) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <button
          className={clsx(
            "text-caption-3 flex cursor-pointer items-center justify-center gap-1 rounded-[99px] border px-2 py-[6px]",
            liked
              ? "border-border-brand bg-background-brandSecondary text-text-onsecondary"
              : "border-border-secondary bg-background-primary text-text-tertiary",
          )}
          onClick={handleLike}
        >
          <HeartIcon
            width="14px"
            height="14px"
            color={liked ? "#00a6f4" : "#737373"}
          />
          <span className="leading-none">좋아요</span>
          <span className="leading-none">{count}</span>
        </button>
        <span className="text-caption-3 text-text-tertiary">{createdAt}</span>
      </div>
      {isModalOpen && (
        <ModalWrapper onClose={() => setIsModalOpen(false)}>
          <h3 className="text-title-3 text-text-primary">
            로그인이 필요한 서비스입니다.
          </h3>
          <Button onClick={() => setIsModalOpen(false)}>확인</Button>
        </ModalWrapper>
      )}
    </>
  );
};

export default PostDetailFooter;
