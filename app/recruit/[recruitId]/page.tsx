"use client";

import { useState } from "react";
import CenterNameSection from "./components/CenterNameSection";
import TabTitle from "./components/TabTitle";
import RecruitmentInfo from "./components/RecruitmentInfo";
import RecruitFooter from "./components/RecruitFooter";

const RecruitByIdPage = () => {
  const tabs = [
    { key: "condition", label: "근무조건" },
    { key: "", label: "" },
  ];
  const [activeTab, setActiveTab] = useState("condition");
  const site = "https://example.com";

  return (
    <>
      <main className="h-[calc(100vh-46px)] overflow-y-auto bg-background-primary scrollbar-none">
        <CenterNameSection
          centerName="00휘트니스 서현점"
          createdAt="2025.11.03"
        />
        <TabTitle
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        {activeTab === "condition" ? <RecruitmentInfo /> : <></>}
      </main>
      <RecruitFooter site={site} />
    </>
  );
};

export default RecruitByIdPage;
