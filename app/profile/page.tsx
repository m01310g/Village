"use client";

import ProfileViewSection from "./components/ProfileViewSection";
import PostsSection from "./components/PostsSection";
import { useUserProfile } from "./hooks/useUserProfile";

const ProfilePage = () => {
  const { data: profile, isLoading, error } = useUserProfile();

  const sortedPosts = [...(profile?.boards ?? [])].sort(
    (a, b) => new Date(b.writtenAt).getTime() - new Date(a.writtenAt).getTime(),
  );

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
      <ProfileViewSection profile={profile} isMyProfile={true} />
      <div className="h-[1px] w-full bg-border-tertiary" />
      <PostsSection
        nickname={profile.nickname}
        isMyProfile
        posts={sortedPosts}
      />
    </div>
  );
};

export default ProfilePage;
