"use client";

import { useAuthStore } from "@/store/useAuthStore";
import ProfileViewSection from "./components/ProfileViewSection";
import PostsSection from "./components/PostsSection";
import { useUserProfile } from "./hooks/useUserProfile";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  const { data: profile, isLoading, error } = useUserProfile();

  if (!profile) {
    router.replace("/profile/create");
    return null;
  }

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

  const loggedInId = user?.id;
  const isMyProfile = profile.id === loggedInId;

  return (
    <div className="flex flex-col gap-4">
      <ProfileViewSection
        isMyProfile={isMyProfile}
        nickname={profile.nickname}
        role={profile.type}
        neighborCount={profile.neighbor}
      />
      <div className="h-[1px] w-full bg-border-tertiary" />
      <PostsSection
        nickname={isMyProfile ? profile.nickname : "닉네임"}
        isMyProfile={isMyProfile}
        posts={profile.boards}
      />
    </div>
  );
};

export default ProfilePage;
