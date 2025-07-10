"use client";

import BackIcon from "@/public/icons/chevron-left.svg";
import { useSearchKeywordStore } from "@/store/useSearchKeywordStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const HeaderBackButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { keyword, setKeyword } = useSearchKeywordStore();
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.history.length > 2) {
      setHasHistory(true);
    }
  }, []);

  const handleBack = () => {
    const page = searchParams.get("page");

    if (
      pathname.startsWith("/recruit/") &&
      pathname !== "/recruit" &&
      keyword
    ) {
      const query = new URLSearchParams();
      query.set("keyword", keyword);
      if (page) query.set("page", page);

      router.push(`/recruit?${query.toString()}`);
    } else if (keyword) {
      setKeyword("");
      router.replace("/recruit");
    } else if (hasHistory) {
      router.back();
    } else {
      router.push("/");
    }
  };
  return (
    <button type="button" onClick={handleBack}>
      <BackIcon width="24px" height="24px" color="#171717" />
    </button>
  );
};

export default HeaderBackButton;
