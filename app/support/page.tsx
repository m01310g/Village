"use client";

import { useEffect, useState } from "react";
import { useSetHeader } from "../components/header/HeaderContext";
import ListItem from "../terms/components/ListItem";

interface FAQ {
  question: string;
  answer: string;
}

const SupportPage = () => {
  const setHeader = useSetHeader();
  const [faqList, setFaqList] = useState<FAQ[]>([]);

  useEffect(() => {
    setHeader({ title: "고객지원 / FAQ", showBackButton: true });

    const loadFAQ = async () => {
      const res = await fetch("/data/faq.json");
      const data = await res.json();

      setFaqList(data);
    };

    loadFAQ();
  }, [setHeader]);

  return (
    <main className="h-[calc(100vh-46px-env(safe-area-inset-bottom))] overflow-y-auto bg-background-primary pb-5">
      <h2 className="text-title-1 px-4 pb-5 pt-3 text-neutral-900">
        빌리지의 궁금한 점 다 알려드릴게요.
      </h2>
      <ul>
        {faqList.map((item, i) => (
          <div key={i}>
            <ListItem title={item.question} content={item.answer} />
            <div className="h-[1px] bg-border-primary" />
          </div>
        ))}
      </ul>
    </main>
  );
};

export default SupportPage;
