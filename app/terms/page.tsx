"use client";

import { useSetHeader } from "@/app/components/header/HeaderContext";
import { useEffect, useState } from "react";
import ListItem from "./components/ListItem";

const TermsPage = () => {
  const setHeader = useSetHeader();
  const [serviceTerms, setServiceTerms] = useState("");
  const [privacyPolicy, setPrivacyPolicy] = useState("");

  useEffect(() => {
    setHeader({
      title: "서비스이용약관 / 개인정보처리방침",
      showBackButton: true,
    });

    const loadMarkdown = async () => {
      const service = await fetch("/terms/service-terms.md").then((res) =>
        res.text(),
      );

      const privacy = await fetch("/terms/privacy-policies.md").then((res) =>
        res.text(),
      );
      setServiceTerms(service);
      setPrivacyPolicy(privacy);
    };

    loadMarkdown();
  }, [setHeader]);

  return (
    <main className="h-[calc(100vh-46px-env(safe-area-inset-bottom))] overflow-y-auto bg-background-primary py-5">
      <ul>
        <ListItem title="서비스이용약관" content={serviceTerms} />
        <div className="h-[1px] w-full bg-border-secondary" />
        <ListItem title="개인정보처리방침" content={privacyPolicy} />
      </ul>
    </main>
  );
};

export default TermsPage;
