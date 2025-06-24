"use client";

import { useEffect, useState } from "react";
import { useSetHeader } from "../components/header/HeaderContext";
import FilteringButton from "../components/feed/FilteringButton";
import PostCard from "../components/post/PostCard";
import FloatingButton from "../components/post/FloatingButton";
import { usePostList } from "./hooks/usePostList";
import { useAuthStore } from "@/store/useAuthStore";

const Page = () => {
  const setHeader = useSetHeader();
  const [activeFilter, setActiveFilter] = useState("전체");
  const filters = ["전체", "업계이야기", "채용", "교육"];
  const { data: postList, isLoading, error } = usePostList();
  const userId = useAuthStore.getState().user?.id;

  useEffect(() => {
    setHeader({
      title: "",
      showBackButton: false,
      showSearchButton: true,
      showNotificationButton: true,
      showSettingButton: false,
    });
  }, [setHeader]);

  const filteredPosts =
    activeFilter === "전체"
      ? (postList ?? []).filter((post) => post.id !== 1)
      : (postList ?? []).filter((post) => {
          const typeIndex = filters.indexOf(activeFilter) - 1;
          return post.type === typeIndex && post.id !== 1;
        });

  return (
    <div className="flex h-full max-w-[375px] flex-col">
      <div className="flex w-full max-w-[375px] gap-1 bg-background-primary px-4 py-3">
        {filters.map((filter, i) => (
          <FilteringButton
            key={i}
            content={filter}
            isActive={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          />
        ))}
      </div>
      <div className="h-full overflow-y-auto">
        {filteredPosts.map((post) => {
          const postUserId = post.writtenBy.id;
          const isMyProfile = postUserId === userId! + 1;
          return <PostCard key={post.id} post={post} isMyProfile={true} />;
        })}
      </div>
      <div className="fixed bottom-[81px] left-1/2 z-50 flex w-full max-w-[375px] -translate-x-1/2 px-4 pb-4">
        <FloatingButton />
      </div>
    </div>
  );
};

export default Page;
