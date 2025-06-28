"use client";

import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { useSetHeader } from "../components/header/HeaderContext";
import clsx from "clsx";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
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
      showNotificationButton:
        profileId !== null &&
        ((pathname === "/profile" && userId !== profileId) ||
          (pathname.startsWith("/profile/") &&
            !pathname.endsWith("/neighbors") &&
            userId !== profileId)),

      showSettingButton:
        profileId === null && pathname === "/profile" && isLoggedIn,
    });
  }, [pathname, profileId, userId, setHeader, isLoggedIn]);

  return (
    <main
      className={clsx(
        "overflow-y-auto bg-background-primary",
        pathname === "/profile/edit" ||
          pathname === "/profile/neighbors" ||
          (pathname.startsWith("/profile/") && !pathname.endsWith("/neighbors"))
          ? "h-[calc(100vh-46px)]"
          : "h-[calc(100vh-46px-81px)]",
      )}
    >
      {children}
    </main>
  );
};

export default ProfileLayout;
