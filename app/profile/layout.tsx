"use client";

import { usePathname } from "next/navigation";
import Header from "../components/Header";
import { useAuthStore } from "@/store/useAuthStore";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { user } = useAuthStore((state) => state);
  const profileIdMatch = pathname.match(/^\/profile\/(\d+)/);
  const profileId = profileIdMatch ? Number(profileIdMatch[1]) : null;
  const userId = user?.id;

  const getTitleByPath = (path: string) => {
    if (path === "/profile") return "빌리지";
    if (path === "/profile/create") return "프로필 등록";
  };

  return (
    <>
      <Header
        title={getTitleByPath(pathname) || "프로필"}
        showBackButton
        showNotificationButton={
          profileId !== null &&
          ((pathname === "/profile" && userId !== profileId) ||
            (pathname.startsWith("/profile/") &&
              !pathname.endsWith("/neighbors") &&
              userId !== profileId))
        }
        showSettingButton={
          profileId !== null &&
          userId === profileId &&
          !pathname.endsWith("/neighbors")
        }
      />
      <main className="h-[calc(100vh-46px)] overflow-y-auto">{children}</main>
    </>
  );
};

export default ProfileLayout;
