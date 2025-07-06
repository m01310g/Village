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
import { CommentType } from "./components/comments/types/commentType";

const PostDetailPage = () => {
  const setHeader = useSetHeader();
  const userId = useAuthStore.getState().user?.id;
  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData, isLoading } = usePostData(postId);
  const [isMyPost, setIsMyPost] = useState(false);
  const [isPostBottomSheetOpen, setIsPostBottomSheetOpen] = useState(false);
  const [commentsList, setCommentsList] = useState<CommentType[]>([]);
  const [commentCount, setCommentCount] = useState(0);
  const types = ["업계정보", "채용", "교육"];
  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn = !!accessToken;

  useEffect(() => {
    if (postData) {
      setCommentsList(postData?.comments);
      setCommentCount(postData.commentNumber ?? 0);
      if (userId) setIsMyPost(postData.writtenBy.id === userId);
    }
  }, [postData, userId]);

  useEffect(() => {
    setHeader({
      title: "빌리지",
      showBackButton: true,
      showMenuButton: isMyPost,
      onClick: () => setIsPostBottomSheetOpen(true),
    });
  }, [setHeader, isMyPost]);

  return isLoading ? (
    <div>로딩중...</div>
  ) : (
    <>
      <div className="flex h-full flex-col overflow-y-auto scrollbar-none">
        {/* type으로 변경 */}
        <div className="px-4 py-3">
          <span className="text-caption-2 w-fit rounded-[4px] bg-neutral-50 p-1 text-center text-text-tertiary">
            {typeof postData?.type === "number" ? types[postData.type] : ""}
          </span>
        </div>
        {postData && (
          <>
            <PostDetailCard post={postData} />
            <CommentsSection comments={commentsList} />
            <CommentCreateSection
              postId={postId}
              setComments={setCommentsList}
              commentCount={commentCount}
              setCommentCount={setCommentCount}
              isLoggedIn={isLoggedIn}
            />
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
