import { useState } from "react";
import CommentCreateButton from "./CommentCreateButton";
import clsx from "clsx";

const CommentCreateSection = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <section className="fixed bottom-0 flex w-full max-w-[375px] items-center justify-center gap-1 bg-background-primary px-4 py-[11px]">
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
      <CommentCreateButton isActive={!!inputValue} />
    </section>
  );
};

export default CommentCreateSection;
