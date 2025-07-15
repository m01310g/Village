"use client";

import { useRef, useCallback, useState } from "react";
import FilteringButton from "../components/feed/FilteringButton";
import PostCard from "../components/post/PostCard";
import FloatingButton from "../components/post/FloatingButton";
import { usePostList } from "./hooks/usePostList";
import { useScrollRestoration } from "../lib/hooks/useScrollRestoration";
import { usePathname } from "next/navigation";
import { useScrollStore } from "@/store/useScrollStore";
import { useUserProfile } from "../(main)/hooks/useUserProfile";
import { usePostInfiniteScroll } from "./hooks/usePostInfiniteScroll";
import { useFilteredPosts } from "./hooks/useFilteredPosts";
import { POST_FILTERS } from "./constants/postFilters";
import { useCommunityHeader } from "./hooks/useCommunityHeader";
import { useSyncPageToSearchParam } from "./hooks/useSyncPageToSearchParam";
import { usePostAccumulator } from "./hooks/usePostAccumulator";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
import { useProfileModalTrigger } from "./hooks/useProfileModalTrigger";
import ProfileRegisterModal from "./components/ProfileRegisterModal";
import { useCommunityStore } from "./store/useCommunityStore";

const Page = () => {
  const scrollRef = useRef<HTMLDivElement>(null!);
  const loaderRef = useRef<HTMLDivElement>(null!);
  const isLoggedIn = useIsLoggedIn();
  const { getActiveFilter, setActiveFilter: saveActiveFilter } =
    useScrollStore();
  const pathname = usePathname();
  const { page, setPage, allPosts, setAllPosts } = useCommunityStore();
  const [activeFilter, setActiveFilter] = useState(
    () => getActiveFilter(pathname) || "전체",
  );
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { data: postList } = usePostList(page);
  const { data: user } = useUserProfile(isLoggedIn);

  useScrollRestoration(scrollRef);
  usePostAccumulator({ postList, setAllPosts });
  useCommunityHeader();
  useSyncPageToSearchParam(page);
  useProfileModalTrigger(user, setShowProfileModal);

  const filteredPosts = useFilteredPosts(allPosts, activeFilter);

  const loadNextPage = useCallback(() => {
    setPage(page + 1);
  }, [page, setPage]);

  usePostInfiniteScroll({
    loaderRef,
    scrollRef,
    isLastPage: postList?.isLastPage,
    onLoadMore: loadNextPage,
    page,
    allPostsLength: allPosts.length,
  });

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    saveActiveFilter(pathname, filter);
  };

  return (
    <div className="flex h-full max-w-[375px] flex-col bg-background-primary">
      {showProfileModal && (
        <ProfileRegisterModal setShowModal={setShowProfileModal} />
      )}
      <div className="flex w-full max-w-[375px] gap-1 px-4 py-3">
        {POST_FILTERS.map((filter) => (
          <FilteringButton
            key={filter}
            content={filter}
            isActive={activeFilter === filter}
            onClick={() => handleFilterChange(filter)}
          />
        ))}
      </div>
      <div
        className="h-[calc(100dvh-81px-100px-env(safe-area-inset-bottom))] overflow-y-auto scrollbar-thin"
        ref={scrollRef}
      >
        {filteredPosts &&
          filteredPosts.map((post) => {
            return (
              <PostCard
                key={`post-${post.id}`}
                post={post}
                isMyProfile={post.isNeighbor === 4}
              />
            );
          })}
        <div ref={loaderRef} className="invisible h-[1px] w-full" />
      </div>
      <div className="fixed bottom-[81px] left-1/2 z-40 flex w-full max-w-[375px] -translate-x-1/2 px-4 pb-4">
        <FloatingButton />
      </div>
    </div>
  );
};

export default Page;
