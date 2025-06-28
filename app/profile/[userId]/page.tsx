"use client";

import { useParams } from "next/navigation";
import { useProfileById } from "./hooks/useProfileById";
import ProfileViewSection from "../components/ProfileViewSection";
import PostsSection from "../components/PostsSection";

const UserProfilePage = () => {
  const params = useParams();
  const profileId = Number(params.userId);
  const { data: profile } = useProfileById(profileId);

  const sortedPosts = [...(profile?.boards ?? [])].sort(
    (a, b) => new Date(b.writtenAt).getTime() - new Date(a.writtenAt).getTime(),
  );

  if (!profile) return null;

  return (
    <div className="flex flex-col gap-4">
      <ProfileViewSection profile={profile} isMyProfile={false} />
      <div className="h-[1px] w-full bg-border-tertiary" />
      <PostsSection
        nickname={profile.nickname}
        isMyProfile
        posts={sortedPosts}
      />
    </div>
  );
};

export default UserProfilePage;
