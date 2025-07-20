"use client";

import ProfileViewSection from "./components/ProfileViewSection";
import PostsSection from "./components/PostsSection";
import { useUserProfile } from "./hooks/useUserProfile";
import { useAuthStore } from "@/store/useAuthStore";
import KakaoSigninButton from "../components/KakaoSigninButton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Logo from "@/public/logos/logo_transparent1.svg";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";

interface ErrorWithStatus {
  status: number;
  message: string;
}

const ProfilePage = () => {
  const { isLoggedIn, hasHydrated } = useIsLoggedIn();
  const { data: profile, isLoading, error } = useUserProfile(isLoggedIn);
  const resetAuth = useAuthStore((state) => state.resetAuth);

  const router = useRouter();

  useEffect(() => {
    if (!hasHydrated) return;

    if (!isLoggedIn) {
      resetAuth();
      localStorage.removeItem("profile-form-data");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (error && (error as unknown as ErrorWithStatus).status === 404) {
      router.push("/create/info");
    }
  }, [error, router]);

  const sortedPosts = [...(profile?.boards ?? [])].sort(
    (a, b) => new Date(b.writtenAt).getTime() - new Date(a.writtenAt).getTime(),
  );

  if (!isLoggedIn) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-10 px-4">
        <div className="flex flex-col items-center justify-center gap-6">
          <Logo />
          <span className="text-body-1 text-text-primary">
            트레이너 빌리지에 오신 것을 환영해요!
          </span>
        </div>
        <KakaoSigninButton />
        <span className="text-body-2 text-center text-neutral-300">
          가입하면 빌리지의
          <br />
          <span
            className="cursor-pointer underline"
            onClick={() => router.push("/terms")}
          >
            이용약관 및 개인정보 처리방침
          </span>
          에 동의하게 됩니다.
        </span>
      </div>
    );
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
