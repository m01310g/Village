interface CommentFooterProps {
  createdAt: string;
}

const CommentFooter = ({ createdAt }: CommentFooterProps) => {
  return (
    <footer className="text-caption-3 flex justify-end text-text-tertiary">
      {createdAt}
    </footer>
  );
};

export default CommentFooter;
