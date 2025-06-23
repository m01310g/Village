"use client";

import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { useSetHeader } from "../components/header/HeaderContext";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { user } = useAuthStore((state) => state);
  const profileIdMatch = pathname.match(/^\/profile\/(\d+)/);
  const profileId = profileIdMatch ? Number(profileIdMatch[1]) : null;
  const userId = user?.id;
  const setHeader = useSetHeader();

  const getTitleByPath = (path: string) => {
    if (path === "/profile") return "프로필";
    if (path === "/profile/create") return "프로필 등록";
    if (path === "/profile/edit") return "프로필 수정";
    if (path === "/profile/neighbors") return "내 이웃 목록";
    return "";
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
        profileId !== null &&
        userId === profileId &&
        !pathname.endsWith("/neighbors"),
    });
  }, [pathname, profileId, userId, setHeader]);

  return (
    <main className="h-[calc(100vh-46px-81px)] overflow-y-auto">
      {children}
    </main>
  );
};

export default ProfileLayout;
