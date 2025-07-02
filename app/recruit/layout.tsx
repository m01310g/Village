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
            : "",
      showBackButton: true,
    });
  }, [pathname, setHeader]);

  return <>{children}</>;
};

export default RecruitLayout;
