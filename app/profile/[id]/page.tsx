"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { use, useEffect, useState } from "react";
import ProfileViewSection from "./components/ProfileViewSection";
import PostsSection from "./components/PostsSection";

interface ProfilePageProps {
  params: Promise<{ id: number }>;
}

const ProfilePage = ({ params }: ProfilePageProps) => {
  const { user } = useAuthStore();
  const [profileUserId, setProfileUserId] = useState<number | null>(null);

  useEffect(() => {
    params.then((p) => setProfileUserId(p.id));
  }, [params]);

  if (!profileUserId)
    return (
      // 로딩 컴포넌트 구현 예정
      <div className="flex h-full w-full items-center justify-center">
        로딩중...
      </div>
    );

  const loggedInId = user?.id;
  const nickname = user?.nickname || "닉네임";
  const role = user?.role === "USER" ? "트레이너" : user?.role || "알 수 없음";

  // 이웃 수 받아오는 기능 구현 예정
  const neighborCount = 15;

  const isMyProfile = Number(profileUserId) === loggedInId;

  return (
    <div className="flex flex-col gap-4">
      <ProfileViewSection
        isMyProfile={isMyProfile}
        nickname={nickname}
        role={role}
        neighborCount={neighborCount}
      />
      <div className="h-[1px] w-full bg-border-tertiary" />
      <PostsSection nickname={nickname} isMyProfile={isMyProfile} />
    </div>
  );
};

export default ProfilePage;
