"use client";

import { useState } from "react";
import CenterNameSection from "./components/CenterNameSection";
import TabTitle from "./components/TabTitle";
import RecruitmentInfo from "./components/RecruitmentInfo";

const RecruitByIdPage = () => {
  const tabs = [
    { key: "condition", label: "근무조건" },
    { key: "", label: "" },
  ];
  const [activeTab, setActiveTab] = useState("condition");

  return (
    <main className="h-[calc(100vh-46px)] overflow-y-auto bg-background-primary">
      <CenterNameSection
        centerName="00휘트니스 서현점"
        createdAt="2025.11.03"
      />
      <TabTitle tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <RecruitmentInfo />
    </main>
  );
};

export default RecruitByIdPage;
