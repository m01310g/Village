import { Dispatch, SetStateAction, useState } from "react";
import CommentCreateButton from "./CommentCreateButton";
import clsx from "clsx";

interface CommentsCreateSectionProps {
  postId: number;
  setComments: Dispatch<SetStateAction<CommentType[]>>;
}

const CommentCreateSection = ({
  postId,
  setComments,
}: CommentsCreateSectionProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!inputValue) return;
    // const newComment = { id: postId, content: inputValue };
    if (!inputValue) return;

    const newComment: CommentType = {
      id: postId,
      content: inputValue,
      writtenAt: "1일 전",
      writtenBy: {
        id: 1,
        name: "테스트 이름",
        nickname: "작성자",
        profileImage: "/icons/icn_user-profile-02.svg",
      },
    };

    setComments((prev) => [...prev, newComment]);
    setInputValue("");
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
