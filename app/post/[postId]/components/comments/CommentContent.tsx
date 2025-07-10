import Linkify from "linkify-react";

interface CommetnContentProps {
  content: string;
}

const CommetnContent = ({ content }: CommetnContentProps) => {
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

export default CommetnContent;
