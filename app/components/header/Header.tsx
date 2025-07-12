"use client";

import { usePathname } from "next/navigation";
import HeaderCreateButton from "./HeaderCreateButton";
import HeaderMenuButton from "./HeaderMenuButton";
import HeaderSettingButton from "./HeaderSettingButton";
import Logo from "@/public/logos/logo_transparent3.svg";
import HeaderSearchButton from "./HeaderSearchButton";
import HeaderRefreshButton from "./HeaderRefreshButton";
import AlertIcon from "@/public/icons/icn_alert_on.svg";
import HeaderBackButton from "./HeaderBackButton";

interface HeaderProps {
  title: string;
  showLogo?: boolean;
  showBackButton?: boolean;
  showSearchButton?: boolean;
  showNotificationButton?: boolean;
  showSettingButton?: boolean;
  showCreateButton?: boolean;
  showMenuButton?: boolean;
  showRefreshButton?: boolean;
  showCreateButtonProps?: {
    className: string;
    disabled: boolean;
    label: string;
  };
  onClick?: () => void;
}

const Header = ({
  title,
  showLogo = false,
  showBackButton = false,
  showSearchButton = false,
  showNotificationButton = false,
  showSettingButton = false,
  showCreateButton = false,
  showMenuButton = false,
  showRefreshButton = false,
  showCreateButtonProps = { className: "", disabled: true, label: "" },
  onClick,
}: HeaderProps) => {
  const pathname = usePathname();

  if (pathname === "/neighbors" || pathname === "/search-post") return null;

  return (
    <header className="flex h-[46px] shrink-0 items-center justify-between border-b border-border-primary bg-background-primary px-1">
      {showLogo && (
        <div className="px-3">
          <Logo color="#4A5565" width="60px" height="30px" />
        </div>
      )}
      <div className="flex h-full w-[46px] items-center justify-center">
        {showBackButton && <HeaderBackButton />}
      </div>
      <div className="flex flex-1 justify-center">
        <h1 className="text-title-2">{title}</h1>
      </div>

      <div className="flex h-full w-[46px] items-center justify-center">
        {showSearchButton && <HeaderSearchButton />}
        {showNotificationButton && (
          <button type="button">
            <AlertIcon />
          </button>
        )}
        {showSettingButton && <HeaderSettingButton />}
        {showCreateButton && (
          <HeaderCreateButton
            showCreateButtonProps={showCreateButtonProps}
            onClick={onClick}
            label={showCreateButtonProps.label}
          />
        )}
        {showMenuButton && <HeaderMenuButton onClick={onClick ?? (() => {})} />}
        {showRefreshButton && <HeaderRefreshButton />}
      </div>
    </header>
  );
};

export default Header;
