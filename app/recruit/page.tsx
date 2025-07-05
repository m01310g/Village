import { Suspense } from "react";
import ClientRecruitPage from "./ClientRecruitPage";

const RecruitPage = () => {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ClientRecruitPage />
    </Suspense>
  );
};

export default RecruitPage;
