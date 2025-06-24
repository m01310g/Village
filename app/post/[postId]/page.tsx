"use client";

import { useSetHeader } from "@/app/components/header/HeaderContext";
import { useEffect, useState } from "react";
import PostDetailCard from "./components/PostDetailCard";
import CommentsSection from "./components/comments/CommentsSection";
import CommentCreateSection from "./components/comments/CommentCreateSection";
import { useParams } from "next/navigation";
import { usePostData } from "./hooks/usePostData";
import { useAuthStore } from "@/store/useAuthStore";
import PostManageBottomSheet from "@/app/components/post/PostManageBottomSheet";

const PostDetailPage = () => {
  const setHeader = useSetHeader();
  const userId = useAuthStore.getState().user?.id;
  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData, isLoading, error } = usePostData(postId);
  const isMyPost = postData?.writtenBy.id === (userId || 0) + 1;
  const [isPostBottomSheetOpen, setIsPostBottomSheetOpen] = useState(false);
  const types = ["업계정보", "채용", "교육"];

  useEffect(() => {
    setHeader({
      title: "빌리지",
      showBackButton: true,
      showMenuButton: isMyPost,
      onClick: () => setIsPostBottomSheetOpen(true),
    });
  }, [setHeader]);

  return (
    <>
      <div className="flex h-full flex-col overflow-y-auto">
        {/* type으로 변경 */}
        <div className="px-4 py-3">
          <span className="text-caption-2 w-fit rounded-[4px] bg-neutral-50 p-1 text-center text-text-tertiary">
            {postData ? types[postData.type] : ""}
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
      {isPostBottomSheetOpen && (
        <PostManageBottomSheet
          postId={postData!.id}
          setIsOpen={setIsPostBottomSheetOpen}
        />
      )}
    </>
  );
};

export default PostDetailPage;
