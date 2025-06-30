import Linkify from "linkify-react";

interface PostDetailContentProps {
  content: string;
}

const PostDetailContent = ({ content }: PostDetailContentProps) => {
  return (
    <main className="text-body-3 h-fit max-w-[90%] whitespace-pre-line break-words text-text-primary">
      <Linkify
        options={{ target: "_blank", className: "text-text-brand underline" }}
      >
        {content}
      </Linkify>
    </main>
  );
};

export default PostDetailContent;
