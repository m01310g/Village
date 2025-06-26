"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import HeaderCreateButton from "./HeaderCreateButton";
import HeaderMenuButton from "./HeaderMenuButton";
import HeaderSettingButton from "./HeaderSettingButton";
import Logo from "@/public/logos/logo_transparent3.svg";

interface HeaderProps {
  title: string;
  showLogo?: boolean;
  showBackButton?: boolean;
  showSearchButton?: boolean;
  showNotificationButton?: boolean;
  showSettingButton?: boolean;
  showCreateButton?: boolean;
  showMenuButton?: boolean;
  showCreateButtonProps?: {
    className: string;
    disabled: boolean;
    label: string;
  };
  onClick?: () => void;
}

// 로고 확정 시 로고 추가
const Header = ({
  title,
  showLogo = false,
  showBackButton = false,
  showSearchButton = false,
  showNotificationButton = false,
  showSettingButton = false,
  showCreateButton = false,
  showMenuButton = false,
  showCreateButtonProps = { className: "", disabled: true, label: "" },
  onClick,
}: HeaderProps) => {
  const router = useRouter();
  return (
    <header className="flex h-[46px] items-center justify-between border-b border-border-primary bg-background-primary px-1">
      {showLogo && (
        <div className="px-3">
          <Logo color="#4A5565" width="60px" height="30px" />
        </div>
      )}
      <div className="flex h-full w-[46px] items-center justify-center">
        {showBackButton && (
          <button type="button" onClick={() => router.back()}>
            <Image
              src="/icons/chevron-left.svg"
              alt="뒤로 가기 버튼"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
      <div className="flex flex-1 justify-center">
        <h1 className="text-title-2">{title}</h1>
      </div>
      {/* 각 버튼에 onClick 함수 추가 예정 */}
      {showSearchButton && (
        <div className="flex h-full w-[46px] items-center justify-center">
          <button type="button">
            <Image
              src={"/icons/icn_search.svg"}
              alt="검색 버튼"
              width={24}
              height={24}
            />
          </button>
        </div>
      )}
      <div className="flex h-full w-[46px] items-center justify-center">
        {showNotificationButton && (
          <button type="button">
            <Image
              src={"/icons/icn_alert_on.svg"}
              alt="알림 버튼"
              width={24}
              height={24}
            />
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
      </div>
    </header>
  );
};

export default Header;
