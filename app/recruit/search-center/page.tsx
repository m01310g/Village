"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RecruitSearchBar from "../components/RecruitSearchBar";
import { useSearchKeywordStore } from "@/store/useSearchKeywordStore";

const SearchCenterPage = () => {
  const { keyword, setKeyword } = useSearchKeywordStore();
  const [input, setInput] = useState(keyword);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setKeyword(input);
    if (input.trim() === "") {
      router.push("/recruit");
    } else {
      router.replace(`/recruit?keyword=${encodeURIComponent(input)}`);
    }
  };

  return (
    <main className="h-[calc(100vh-46px-env(safe-area-inset-bottom))] bg-background-primary p-4">
      <RecruitSearchBar
        keyword={input}
        setKeyword={setInput}
        onSubmit={handleSubmit}
      />
    </main>
  );
};

export default SearchCenterPage;
