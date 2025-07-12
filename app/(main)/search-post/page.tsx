"use client";

import SearchPostsHeader from "./components/SearchPostsHeader";
import { useSearchParams } from "next/navigation";

const SearchPostPage = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";

  return (
    <>
      <SearchPostsHeader keyword={keyword} />
      <main className="h-[calc(100dvh-46px-env(safe-area-inset-bottom))] bg-background-primary"></main>
    </>
  );
};

export default SearchPostPage;
