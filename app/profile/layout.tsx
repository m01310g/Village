"use client";

import { usePathname } from "next/navigation";
import Header from "../components/Header";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const getTitleByPath = (path: string) => {
    if (path === "/profile") return "빌리지";
    if (path === "/profile/create") return "프로필 등록";
  };

  return (
    <>
      <Header
        title={getTitleByPath(pathname) || "프로필"}
        showBackButton
        showNotificationButton={pathname === "/profile"}
      />
      <main className="h-[calc(100vh-46px)] overflow-y-auto">{children}</main>
    </>
  );
};

export default ProfileLayout;
