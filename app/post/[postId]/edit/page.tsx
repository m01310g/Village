"use client";

import { useSetHeader } from "@/app/components/header/HeaderContext";
import { useCallback, useEffect, useState } from "react";
import { usePostData } from "../hooks/usePostData";
import { useParams, useRouter } from "next/navigation";
import PostForm from "../components/PostForm";
import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";
import ModalWrapper from "@/app/components/modal/ModalWrapper";
import Button from "@/app/components/Button";

const PostEditPage = () => {
  const setHeader = useSetHeader();
  const params = useParams();
  const postId = Number(params.postId);
  const [isActive, setIsActive] = useState<"업계이야기" | "채용" | "교육">(
    "업계이야기",
  );
  const [content, setContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [originalImages, setOriginalImages] = useState<string[]>([]);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: postData, isLoading } = usePostData(postId);

  const arraysAreEqual = (a: string[], b: string[]) => {
    if (a.length !== b.length) return false;
    return a.every((val, idx) => val === b[idx]);
  };

  const handleEdit = useCallback(async () => {
    const typeMap = { 업계이야기: 0, 채용: 1, 교육: 2 } as const;

    const formData = {
      id: postData!.id,
      type: typeMap[isActive],
      content,
      images,
    };

    try {
      const res = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-community/modifyBoard`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(formData),
        },
      );

      if (!res.ok) {
        const error = await res.json();
        if (error.statusCode === 400) {
          throw new Error(`요청 형식 오류: ${error.message}`);
        } else if (error.statusCode === 401) {
          throw new Error(
            `유효하지 않거나 기간이 만료된 토큰: ${error.message}`,
          );
        } else if (error.statusCode === 403) {
          throw new Error(`유저 회원이 아닙니다: ${error.message}`);
        } else if (error.statusCode === 404) {
          throw new Error(`등록된 프로필 없음: ${error.message}`);
        } else {
          throw new Error(error.message);
        }
      }

      const result = await res.json();
      const data = result.data;

      router.replace(`/post/${data.id}`);
    } catch (err) {
      console.error(
        err instanceof Error ? `게시글 등록 실패: ${err.message}` : err,
      );
    }
  }, [router, isActive, content, images, postData]);

  useEffect(() => {
    if (postData?.isNeighbor !== 4) {
      setIsModalOpen(true);
    }
  }, [postData]);

  useEffect(() => {
    if (postData) {
      const types = ["업계이야기", "채용", "교육"];

      if (typeof postData.type === "number") {
        setIsActive(types[postData.type] as "업계이야기" | "채용" | "교육");
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
    const isChanged = isContentChanged || isImagesChanged;

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
  }, [setHeader, content, originalContent, originalImages, images, handleEdit]);

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
            onClick={() => router.push(`/post/${postData.id}`)}
          >
            확인
          </Button>
        </ModalWrapper>
      )}
    </>
  );
};

export default PostEditPage;
