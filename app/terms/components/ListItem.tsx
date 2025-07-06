import dynamic from "next/dynamic";
import { useState } from "react";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import ArrowDown from "@/public/icons/chevron-down.svg";

interface ListItemProps {
  title: string;
  content: string;
}

const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });

const ListItem = ({ title, content }: ListItemProps) => {
  const [isListOpen, setIsListOpen] = useState(false);

  return (
    <li className="text-body-2 bg-background-primary text-neutral-800">
      <div
        className="flex cursor-pointer items-center justify-between px-4 py-5"
        onClick={() => setIsListOpen((prev) => !prev)}
      >
        <p>{title}</p>
        <ArrowDown width="20px" height="20px" />
      </div>
      {isListOpen && (
        <div className="text-body-2 prose prose-sm max-w-none px-4 pb-5 pt-3 text-neutral-800">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          >
            {content}
          </ReactMarkdown>
        </div>
      )}
    </li>
  );
};

export default ListItem;
