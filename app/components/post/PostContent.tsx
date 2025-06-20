interface PostContentProps {
  content: string;
}

const PostContent = ({ content }: PostContentProps) => {
  return (
    <main className="text-body-3 line-clamp-2 h-9 max-w-[90%] overflow-hidden text-ellipsis whitespace-pre-line break-words text-text-primary">
      {content}
    </main>
  );
};

export default PostContent;
