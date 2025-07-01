import { useSetHeader } from "@/app/components/header/HeaderContext";
import { useEffect } from "react";

const RecruitSelectRegionPage = () => {
  const setHeader = useSetHeader();

  useEffect(() => {
    setHeader({ title: "지역 조건 설정", showBackButton: true });
  });
};

export default RecruitSelectRegionPage;
