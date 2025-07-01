"use client";

import { useSetHeader } from "@/app/components/header/HeaderContext";
import { useCallback, useEffect, useState } from "react";
import { usePostData } from "../hooks/usePostData";
import { useParams, useRouter } from "next/navigation";
import PostForm from "../components/PostForm";
import ModalWrapper from "@/app/components/modal/ModalWrapper";
import Button from "@/app/components/Button";
import { useEditPost } from "../hooks/useEditPost";

const PostEditPage = () => {
  const setHeader = useSetHeader();
  const params = useParams();
  const postId = Number(params.postId);
  const [isActive, setIsActive] = useState<"업계이야기" | "채용" | "교육">(
    "업계이야기",
  );
  const [originalIsActive, setOriginalIsActive] = useState<
    "업계이야기" | "채용" | "교육"
  >("업계이야기");
  const [content, setContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [originalImages, setOriginalImages] = useState<string[]>([]);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: postData, isLoading } = usePostData(postId);

  const typeMap = { 업계이야기: 0, 채용: 1, 교육: 2 } as const;

  const formData = {
    id: postData!.id,
    type: typeMap[isActive],
    content,
    images,
  };
  const editPostMutation = useEditPost({ ...formData });

  const arraysAreEqual = (a: string[], b: string[]) => {
    if (a.length !== b.length) return false;
    return a.every((val, idx) => val === b[idx]);
  };

  const handleEdit = useCallback(async () => {
    editPostMutation.mutate();
  }, [editPostMutation]);

  useEffect(() => {
    if (postData?.isNeighbor !== 4) {
      setIsModalOpen(true);
    }
  }, [postData]);

  useEffect(() => {
    if (postData) {
      const types = ["업계이야기", "채용", "교육"];

      if (typeof postData.type === "number") {
        const category = types[postData.type] as "업계이야기" | "채용" | "교육";

        setIsActive(category);
        setOriginalIsActive(category);
      }
      setContent(postData.content);
      setImages(postData.images || []);
      setOriginalContent(postData.content);
      setOriginalImages(postData.images || []);
    }
  }, [postData]);

  useEffect(() => {
    const isContentChanged = content !== originalContent;
    const isImagesChanged = !arraysAreEqual(images, originalImages);
    const isTypeChanged = isActive !== originalIsActive;
    const isChanged = isContentChanged || isImagesChanged || isTypeChanged;

    const editButtonProps = {
      className: isChanged ? "text-text-onsecondary" : "text-text-disabled",
      disabled: !isChanged,
      label: "수정",
    };

    setHeader({
      title: "빌리지",
      showBackButton: true,
      showCreateButton: true,
      showCreateButtonProps: editButtonProps,
      onClick: handleEdit,
    });
  }, [
    setHeader,
    content,
    originalContent,
    originalImages,
    images,
    handleEdit,
    isActive,
    originalIsActive,
  ]);

  return isLoading || !postData ? (
    <div>로딩중...</div>
  ) : (
    <>
      <PostForm
        isActive={isActive}
        setIsActive={setIsActive}
        content={content}
        setContent={setContent}
        images={images}
        setImages={setImages}
      />
      {isModalOpen && (
        <ModalWrapper onClose={() => setIsModalOpen(false)}>
          <span className="text-title-2 text-text-danger">
            접근 권한이 없습니다.
          </span>
          <Button
            color="primary"
            size="md"
            onClick={() => router.replace(`/post/${postData.id}`)}
          >
            확인
          </Button>
        </ModalWrapper>
      )}
    </>
  );
};

export default PostEditPage;
