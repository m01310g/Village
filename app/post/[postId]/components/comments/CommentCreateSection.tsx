import { Dispatch, SetStateAction, useState } from "react";
import CommentCreateButton from "./CommentCreateButton";
import clsx from "clsx";
import { useCreateComment } from "../../hooks/useCreateComment";
import { CommentType } from "./types/commentType";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

interface CommentsCreateSectionProps {
  postId: number;
  setComments: Dispatch<SetStateAction<CommentType[]>>;
  commentCount: number;
  setCommentCount: (count: number) => void;
  isLoggedIn: boolean;
}

const CommentCreateSection = ({
  postId,
  setComments,
  commentCount,
  setCommentCount,
  isLoggedIn,
}: CommentsCreateSectionProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createCommentMutation = useCreateComment((newComments) => {
    const newComment = newComments[newComments.length - 1];
    setComments((prev) => [...prev, newComment]);
    setCommentCount(commentCount + 1);
    setInputValue("");
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
      return;
    }

    if (!inputValue) return;

    createCommentMutation.mutate({ postId, comment: inputValue });
  };

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="fixed bottom-0 flex w-full max-w-[500px] items-center justify-center gap-1 bg-background-primary px-4 py-[11px]"
      >
        <input
          type="text"
          placeholder="댓글을 입력해주세요."
          className={clsx(
            "placeholder:text-body-3 w-full rounded-[26px] px-4 py-3 placeholder:text-text-tertiary focus:outline-none",
            inputValue
              ? "border border-border-secondary bg-background-primary text-text-primary"
              : "bg-background-secondary",
          )}
          onChange={handleChange}
          value={inputValue}
          maxLength={300}
        />
        <CommentCreateButton onClick={handleSubmit} isActive={!!inputValue} />
      </form>
      {isModalOpen && <LoginRequiredModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
};

export default CommentCreateSection;
