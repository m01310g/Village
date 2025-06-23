import CommentCreateButton from "./CommentCreateButton";

const CommentCreateSection = () => {
  return (
    <section className="fixed bottom-0 flex w-full max-w-[375px] items-center justify-center gap-1 bg-background-primary px-4 py-[11px]">
      <input
        type="text"
        placeholder="댓글을 입력해주세요."
        className="placeholder:text-body-3 w-full rounded-[26px] bg-background-secondary px-4 py-3 placeholder:text-text-tertiary focus:outline-none"
      />
      <CommentCreateButton />
    </section>
  );
};

export default CommentCreateSection;
