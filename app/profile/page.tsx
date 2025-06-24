"use client";

import { useAuthStore } from "@/store/useAuthStore";
import ProfileViewSection from "./components/ProfileViewSection";
import PostsSection from "./components/PostsSection";
import { useUserProfile } from "./hooks/useUserProfile";

const ProfilePage = () => {
  const { data: profile, isLoading, error } = useUserProfile();

  if (isLoading) {
    // 로딩 컴포넌트 구현 예정
    return (
      <div className="flex h-full w-full items-center justify-center">
        로딩중...
      </div>
    );
  }

  if (error) {
    // 에러 컴포넌트 구현 예정
    return (
      <div className="flex h-full w-full items-center justify-center">
        에러가 발생했습니다.
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="flex flex-col gap-4">
      <ProfileViewSection
        profileImage={profile.profileImage}
        isMyProfile
        nickname={profile.nickname}
        name={profile.name}
        introduction={profile.introduction}
        role={profile.type || "트레이너"}
        neighborCount={profile.neighbor}
      />
      <div className="h-[1px] w-full bg-border-tertiary" />
      <PostsSection
        nickname={profile.nickname}
        isMyProfile
        posts={profile.boards}
      />
    </div>
  );
};

export default ProfilePage;
