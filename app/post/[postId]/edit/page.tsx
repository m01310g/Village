"use client";

import { useSetHeader } from "@/app/components/header/HeaderContext";
import { useEffect, useState } from "react";
import { usePostData } from "../hooks/usePostData";
import { useParams } from "next/navigation";
import PostForm from "../components/PostForm";
import { useAuthStore } from "@/store/useAuthStore";

const PostEditPage = () => {
  const setHeader = useSetHeader();
  const params = useParams();
  const postId = Number(params.postId);
  const [isActive, setIsActive] = useState<"업계이야기" | "채용" | "교육">(
    "업계이야기",
  );
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const accessToken = useAuthStore.getState().accessToken;

  const { data: postData, isLoading, error } = usePostData(postId);

  const types = ["업계이야기", "채용", "교육"];

  useEffect(() => {
    setHeader({
      title: "빌리지",
      showBackButton: true,
      showCreateButton: true,
    });
  }, [setHeader]);

  useEffect(() => {
    if (postData) {
      setIsActive(types[postData.type] as "업계이야기" | "채용" | "교육");
      setContent(postData.content);
      setImages(postData.images || []);
    }
  }, [postData]);

  if (isLoading || !postData) return null;

  return (
    <PostForm
      isActive={isActive}
      setIsActive={setIsActive}
      content={content}
      setContent={setContent}
      images={images}
      setImages={setImages}
      accessToken={accessToken!}
    />
  );
};

export default PostEditPage;
