"use client";

import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import HomeIcon from "@/public/icons/icn_home.svg";
import JobListingIcon from "@/public/icons/icn_job_listing.svg";
import UserProfileIcon from "@/public/icons/icn_user-profile-02.svg";
import NeighborsIcon from "@/public/icons/icn_users-profiles-02.svg";

const NavigationBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  // 내비게이션 바 숨길 라우트
  const hiddenPatterns = [
    /^\/create/,
    /^\/edit/,
    /^\/profile\/neighbors/,
    /^\/signin/,
    /^\/web-auth\/kakao\/callback/,
    /^\/post/,
    /^\/settings/,
    /^\/support/,
    /^\/terms/,
    /^\/recruit\/select-region/,
    /^\/recruit\/\d+/,
    /^\/recruit\/search-center/,
    /^\/community\/search-post/,
  ];

  const shouldHideByPattern = hiddenPatterns.some((pattern) =>
    pattern.test(pathname),
  );

  if (shouldHideByPattern || /^\d+$/.test(pathname.slice(1))) {
    return null;
  }

  const activeColor = "#00A6F4";
  const inactiveColor = "#737373";

  const navItems = [
    {
      label: "내 프로필",
      path: "/",
      Icon: UserProfileIcon,
    },
    {
      label: "커뮤니티",
      path: "/community",
      Icon: HomeIcon,
    },
    { label: "이웃", path: "/neighbors", Icon: NeighborsIcon },
    {
      label: "채용공고",
      path: "/recruit",
      Icon: JobListingIcon,
    },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 mx-auto flex h-[81px] max-w-[375px] justify-between gap-2.5 bg-background-primary px-4 py-3">
      {navItems.map(({ label, path, Icon }) => {
        const isActive = pathname === path || pathname.startsWith(path + "/");

        return (
          <button
            key={path}
            className="flex w-[60px] flex-col items-center justify-center gap-0.5"
            onClick={() => router.push(path)}
          >
            <Icon
              color={isActive ? activeColor : inactiveColor}
              width="24px"
              height="24px"
            />
            <p
              className={clsx(
                "text-caption-4",
                isActive ? "text-text-onsecondary" : "text-text-tertiary",
              )}
            >
              {label}
            </p>
          </button>
        );
      })}
    </footer>
  );
};

export default NavigationBar;
