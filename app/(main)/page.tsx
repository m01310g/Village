"use client";

import { useEffect, useState } from "react";
import { useSetHeader } from "../components/header/HeaderContext";
import FilteringButton from "../components/feed/FilteringButton";
import PostCard from "../components/post/PostCard";
import FloatingButton from "../components/post/FloatingButton";

const Page = () => {
  const setHeader = useSetHeader();
  const [activeFilter, setActiveFilter] = useState("전체");
  const filters = ["전체", "업계정보", "채용", "교육"];

  // type 0: 업계정보, 1: 채용, 2: 교육
  const posts = [
    {
      id: 1,
      type: 1,
      content: "채용 테스트",
      writtenAt: "2025-06-21T14:23:55",
      writtenBy: {
        id: 1,
        profileImage: "/icons/icn_user-profile-02.svg",
        nickname: "trainer_123",
        name: "홍길동",
      },
      commentNumber: 1,
      likeNumber: 1,
    },
    {
      id: 2,
      type: 2,
      content: "교육 테스트",
      writtenAt: "2025-06-21T14:23:55",
      writtenBy: {
        id: 1,
        profileImage: "/icons/icn_user-profile-02.svg",
        nickname: "trainer_123",
        name: "홍길동",
      },
      commentNumber: 1,
      likeNumber: 1,
    },
    {
      id: 3,
      type: 0,
      content: "업계정보 테스트",
      writtenAt: "2025-06-21T14:23:55",
      writtenBy: {
        id: 1,
        profileImage: "/icons/icn_user-profile-02.svg",
        nickname: "trainer_123",
        name: "홍길동",
      },
      commentNumber: 1,
      likeNumber: 1,
    },
    {
      id: 4,
      type: 0,
      content: "스크롤 테스트",
      writtenAt: "2025-06-21T14:23:55",
      writtenBy: {
        id: 1,
        profileImage: "/icons/icn_user-profile-02.svg",
        nickname: "trainer_123",
        name: "홍길동",
      },
      commentNumber: 1,
      likeNumber: 1,
    },
    {
      id: 5,
      type: 1,
      content: "스크롤 테스트",
      writtenAt: "2025-06-21T14:23:55",
      writtenBy: {
        id: 1,
        profileImage: "/icons/icn_user-profile-02.svg",
        nickname: "trainer_123",
        name: "홍길동",
      },
      commentNumber: 1,
      likeNumber: 1,
    },
    {
      id: 6,
      type: 2,
      content: "스크롤 테스트",
      writtenAt: "2025-06-21T14:23:55",
      writtenBy: {
        id: 1,
        profileImage: "/icons/icn_user-profile-02.svg",
        nickname: "trainer_123",
        name: "홍길동",
      },
      commentNumber: 1,
      likeNumber: 1,
    },
  ];

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
      ? posts
      : posts.filter((post) => {
          const typeIndex = filters.indexOf(activeFilter) - 1;
          return post.type === typeIndex;
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
        {filteredPosts.map((post, i) => (
          <PostCard key={i} post={post} isMyProfile={false} />
        ))}
      </div>
      <div className="fixed bottom-[81px] left-1/2 z-50 flex w-full max-w-[375px] -translate-x-1/2 px-4 pb-4">
        <FloatingButton />
      </div>
    </div>
  );
};

export default Page;
