import Linkify from "linkify-react";

interface CommentContentProps {
  content: string;
}

const CommentContent = ({ content }: CommentContentProps) => {
  return (
    <main className="text-body-4 h-full max-w-[90%] whitespace-pre-line break-words text-text-primary">
      <Linkify
        options={{ target: "_blank", className: "text-text-brand underline" }}
      >
        {content}
      </Linkify>
    </main>
  );
};

export default CommentContent;
