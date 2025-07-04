"use client";

import { useEffect } from "react";
import { useSetHeader } from "../components/header/HeaderContext";
import { usePathname } from "next/navigation";

const RecruitLayout = ({ children }: { children: React.ReactNode }) => {
  const setHeader = useSetHeader();
  const pathname = usePathname();

  useEffect(() => {
    setHeader({
      title:
        pathname === "/recruit"
          ? "채용 공고"
          : pathname === "/recruit/select-region"
            ? "지역 조건 설정"
            : pathname === "/recruit/search-center"
              ? "센터명 검색"
              : pathname.startsWith("/recruit/") &&
                  !pathname.endsWith("/select-region")
                ? "채용 정보"
                : "",
      showBackButton: true,
      showRefreshButton: pathname === "/recruit/select-region",
    });
  }, [pathname, setHeader]);

  return <>{children}</>;
};

export default RecruitLayout;
