"use client";

import { useSetHeader } from "@/app/components/header/HeaderContext";
import { useEffect } from "react";
import PostDetailCard from "./components/PostDetailCard";
import CommentsSection from "./components/comments/CommentsSection";
import CommentCreateSection from "./components/comments/CommentCreateSection";

const PostDetailPage = () => {
  const setHeader = useSetHeader();

  useEffect(() => {
    setHeader({
      title: "빌리지",
      showBackButton: true,
    });
  }, [setHeader]);

  const postData = {
    data: {
      id: 1,
      type: 1,
      content:
        "이번에 2차 구술까지 끝냈습니다. \n예상보다 구술 질문이 실기보다 어렵네요ㅠ  \n자료 정리해서 공유합니다!",
      images: ["url1", "url2"],
      writtenAt: "2025-06-21T14:23:55",
      writtenBy: {
        id: 1,
        profileImage: "/icons/icn_user-profile-02.svg",
        nickname: "trainer_123",
        name: "홍길동",
      },
      commentNumber: 1,
      likeNumber: 1,
      comments: [
        {
          id: 1,
          content: "와우 멋져요!!",
          writtenAt: "2025-06-21T14:23:55",
          writtenBy: {
            id: 1,
            profileImage: "/icons/icn_user-profile-02.svg",
            nickname: "trainer_123",
            name: "홍길동",
          },
        },
      ],
    },
  };

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {/* type으로 변경 */}
      <div className="px-4 py-3">
        <span className="text-caption-2 w-fit rounded-[4px] bg-neutral-50 p-1 text-center text-text-tertiary">
          업계 정보
        </span>
      </div>
      <PostDetailCard post={postData.data} />
      <CommentsSection
        commentCount={postData.data.commentNumber}
        comments={postData.data.comments}
      />
      <CommentCreateSection />
    </div>
  );
};

export default PostDetailPage;
