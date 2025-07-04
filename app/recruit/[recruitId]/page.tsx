"use client";

import { useState } from "react";
import CenterNameSection from "./components/CenterNameSection";
import TabTitle from "./components/TabTitle";
import RecruitmentInfo from "./components/RecruitmentInfo";
import RecruitFooter from "./components/RecruitFooter";
import { useRecruitmentById } from "../hooks/useRecruitmentById";
import { useParams } from "next/navigation";

const RecruitByIdPage = () => {
  const params = useParams();
  const recruitmentId = Number(params.recruitId);
  const tabs = [
    { key: "condition", label: "근무조건" },
    { key: "", label: "" },
  ];
  const [activeTab, setActiveTab] = useState("condition");
  const { data: recruitment } = useRecruitmentById(recruitmentId);

  return (
    <>
      <main className="h-[calc(100vh-46px)] overflow-y-auto bg-background-primary scrollbar-none">
        <CenterNameSection
          centerName={recruitment?.centerName ?? ""}
          createdAt={recruitment?.date ?? ""}
        />
        <TabTitle
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        {activeTab === "condition" && recruitment ? (
          <RecruitmentInfo {...recruitment} />
        ) : (
          <></>
        )}
      </main>
      <RecruitFooter site={recruitment?.site ?? ""} />
    </>
  );
};

export default RecruitByIdPage;
