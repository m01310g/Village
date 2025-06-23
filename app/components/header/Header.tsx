"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showSearchButton?: boolean;
  showNotificationButton?: boolean;
  showSettingButton?: boolean;
  showCreateButton?: boolean;
  showCreateButtonProps?: { className: string; disabled: boolean };
}

// 로고 확정 시 로고 추가
const Header = ({
  title,
  showBackButton = false,
  showSearchButton = false,
  showNotificationButton = false,
  showSettingButton = false,
  showCreateButton = false,
  showCreateButtonProps = { className: "", disabled: true },
}: HeaderProps) => {
  const router = useRouter();
  return (
    <header className="flex h-[46px] items-center justify-between border-b border-border-primary bg-background-primary px-1">
      <div className="flex h-full w-[46px] items-center justify-center">
        {showBackButton && (
          <button onClick={() => router.back()}>
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
          <button>
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
          <button>
            <Image
              src={"/icons/icn_alert_on.svg"}
              alt="알림 버튼"
              width={24}
              height={24}
            />
          </button>
        )}
        {showSettingButton && (
          <button>
            <Image
              src={"/icons/icn_settings.svg"}
              alt="설정 버튼"
              width={24}
              height={24}
            />
          </button>
        )}
        {showCreateButton && (
          <button
            className={clsx(
              "text-body-2 h-12 w-12",
              showCreateButtonProps.className,
            )}
            disabled={showCreateButtonProps.disabled}
          >
            게시
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
