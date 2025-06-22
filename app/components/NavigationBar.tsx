"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import HomeIcon from "@/public/icons/icn_home.svg";
import JobListingIcon from "@/public/icons/icn_job_listing.svg";
import UserProfileIcon from "@/public/icons/icn_user-profile-02.svg";
import { useAuthStore } from "@/store/useAuthStore";

const NavigationBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const profileId = params?.id;
  const { user } = useAuthStore();

  const hiddenPatterns = [
    /^\/profile\/create/,
    /^\/signin/,
    /^\/web-auth\/kakao\/callback/,
  ];

  const shouldHideByPattern = hiddenPatterns.some((pattern) =>
    pattern.test(pathname),
  );

  const isMyProfile =
    pathname.startsWith("/profile/") && user?.id === profileId;

  if (
    shouldHideByPattern
    // ||(!isMyProfile && pathname.startsWith("/profile/"))
  ) {
    return null;
  }

  const activeColor = "#00A6F4";
  const inactiveColor = "#737373";

  const navItems = [
    {
      label: "홈",
      path: "/",
      Icon: HomeIcon,
    },
    {
      label: "채용공고",
      path: "/job",
      Icon: JobListingIcon,
    },
    {
      label: "내 프로필",
      path: "/profile",
      Icon: UserProfileIcon,
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
