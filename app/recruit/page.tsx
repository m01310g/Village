"use client";

import { useEffect } from "react";
import { useSetHeader } from "../components/header/HeaderContext";

const RecruitPage = () => {
  const setHeader = useSetHeader();

  useEffect(() => {
    setHeader({ title: "채용 공고", showBackButton: true });
  }, [setHeader]);

  return (
    <main className="text-title-1 flex h-[calc(100vh-46px-81px)] items-center justify-center bg-background-primary text-text-primary">
      채용 공고 오픈 예정입니다.
    </main>
  );
};

export default RecruitPage;
