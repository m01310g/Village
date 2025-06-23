"use client";

import FilteringButton from "@/app/components/feed/FilteringButton";
import { useSetHeader } from "@/app/components/header/HeaderContext";
import React, { useEffect, useState } from "react";
import ContentTextarea from "./components/ContentTextarea";
import PostCreateFooter from "./components/PostCreateFooter";

const PostCreatePage = () => {
  const setHeader = useSetHeader();
  const [isActive, setIsActive] = useState("업계정보");
  const [content, setContent] = useState("");
  const types = ["업계정보", "채용", "교육"];

  useEffect(() => {
    const createButtonProps = {
      className:
        content.trim().length > 0
          ? "text-text-onsecondary"
          : "text-text-disabled",
      disabled: content.trim().length === 0,
    };

    setHeader({
      title: "빌리지",
      showBackButton: true,
      showCreateButton: true,
      showCreateButtonProps: createButtonProps,
    });
  }, [setHeader, content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="flex h-full flex-col gap-5 px-4 py-3">
      <div className="border-b-[1px] border-border-primary pb-3">
        {types.map((type, i) => (
          <FilteringButton
            key={i}
            content={type}
            onClick={() => {
              setIsActive(type);
            }}
            isActive={isActive === type}
          />
        ))}
      </div>
      <ContentTextarea content={content} onChange={handleChange} />
      <PostCreateFooter />
    </div>
  );
};

export default PostCreatePage;
