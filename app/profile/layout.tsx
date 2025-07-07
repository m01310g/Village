"use client";

import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useRef } from "react";
import { useSetHeader } from "../components/header/HeaderContext";
import clsx from "clsx";
import { useScrollRestoration } from "../lib/hooks/useScrollRestoration";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useScrollRestoration(scrollRef);

  const pathname = usePathname();
  const { user } = useAuthStore((state) => state);
  const profileIdMatch = pathname.match(/^\/profile\/(\d+)/);
  const profileId = profileIdMatch ? Number(profileIdMatch[1]) : null;
  const userId = user?.id;
  const setHeader = useSetHeader();
  const accessToken = useAuthStore.getState().accessToken;
  const isLoggedIn = typeof window !== "undefined" && !!accessToken;

  const getTitleByPath = (path: string) => {
    if (path === "/profile") return "프로필";
    if (path === "/profile/create/info" || path === "/profile/create/detail")
      return "프로필 등록";
    if (path === "/profile/edit/info" || path === "/profile/edit/detail")
      return "프로필 수정";
    if (path === "/profile/neighbors") return "내 이웃 목록";
    return "빌리지";
  };

  useEffect(() => {
    setHeader({
      title: getTitleByPath(pathname),
      showBackButton: true,
      showSettingButton:
        profileId === null && pathname === "/profile" && isLoggedIn,
    });
  }, [pathname, profileId, userId, setHeader, isLoggedIn]);

  return (
    <main
      className={clsx(
        "overflow-y-auto bg-background-primary",
        pathname.includes("/profile/edit") ||
          pathname.includes("/neighbors") ||
          (pathname.startsWith("/profile/") && !pathname.endsWith("/neighbors"))
          ? "h-[calc(100dvh-46px-env(safe-area-inset-bottom))]"
          : "h-[calc(100dvh-46px-81px-env(safe-area-inset-bottom))]",
      )}
      ref={scrollRef}
    >
      {children}
    </main>
  );
};

export default ProfileLayout;
