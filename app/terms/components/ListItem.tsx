import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

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
        <Image
          src={"/icons/chevron-down.svg"}
          alt={`${title} 펼쳐보기`}
          width={20}
          height={20}
        />
      </div>
      {isListOpen && (
        <div className="prose prose-sm text-body-2 max-w-none px-4 pb-5 pt-3 text-neutral-800">
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
