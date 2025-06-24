"use client";

import { useSetHeader } from "@/app/components/header/HeaderContext";
import { useEffect } from "react";
import PostDetailCard from "./components/PostDetailCard";
import CommentsSection from "./components/comments/CommentsSection";
import CommentCreateSection from "./components/comments/CommentCreateSection";
import { useParams } from "next/navigation";
import { usePostData } from "./hooks/usePostData";

const PostDetailPage = () => {
  const setHeader = useSetHeader();
  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData, isLoading, error } = usePostData(postId);

  useEffect(() => {
    setHeader({
      title: "빌리지",
      showBackButton: true,
    });
  }, [setHeader]);

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {/* type으로 변경 */}
      <div className="px-4 py-3">
        <span className="text-caption-2 w-fit rounded-[4px] bg-neutral-50 p-1 text-center text-text-tertiary">
          업계 정보
        </span>
      </div>
      {postData && (
        <>
          <PostDetailCard post={postData} />
          <CommentsSection
            commentCount={postData.commentNumber}
            comments={postData.comments}
          />
          <CommentCreateSection />
        </>
      )}
    </div>
  );
};

export default PostDetailPage;
