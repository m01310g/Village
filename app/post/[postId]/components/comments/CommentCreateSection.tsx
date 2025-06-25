import { Dispatch, SetStateAction, useState } from "react";
import CommentCreateButton from "./CommentCreateButton";
import clsx from "clsx";
import { useAuthStore } from "@/store/useAuthStore";
import { useCreateComment } from "../../hooks/useCreateComment";

interface CommentsCreateSectionProps {
  postId: number;
  setComments: Dispatch<SetStateAction<CommentType[]>>;
  commentCount: number;
  setCommentCount: (count: number) => void;
}

const CommentCreateSection = ({
  postId,
  setComments,
  commentCount,
  setCommentCount,
}: CommentsCreateSectionProps) => {
  const accessToken = useAuthStore.getState().accessToken;
  const [inputValue, setInputValue] = useState("");

  const createCommentMutation = useCreateComment((newComments) => {
    console.log(newComments);
    const newComment = newComments[newComments.length - 1];
    setComments((prev) => [...prev, newComment]);
    setCommentCount(commentCount + 1);
    setInputValue("");
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!inputValue) return;
    createCommentMutation.mutate({ postId, comment: inputValue });
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="fixed bottom-0 flex w-full max-w-[375px] items-center justify-center gap-1 bg-background-primary px-4 py-[11px]"
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
      />
      <CommentCreateButton onClick={handleSubmit} isActive={!!inputValue} />
    </form>
  );
};

export default CommentCreateSection;
