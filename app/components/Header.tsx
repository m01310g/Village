"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showSearchButton?: boolean;
  showNotificationButton?: boolean;
}

// 로고 확정 시 로고 추가
const Header = ({
  title,
  showBackButton = false,
  showSearchButton = false,
  showNotificationButton = false,
}: HeaderProps) => {
  const router = useRouter();
  return (
    <header className="flex h-[46px] items-center justify-between border-b border-neutral-100 px-1">
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
      <div className="flex h-full w-[46px] items-center justify-center">
        {/* 각 버튼에 onClick 함수 추가 예정 */}
        {showSearchButton && (
          <button>
            <Image
              src={"/icons/icn_search.svg"}
              alt="검색 버튼"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
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
      </div>
    </header>
  );
};

export default Header;
