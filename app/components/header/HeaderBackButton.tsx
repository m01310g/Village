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

    if (keyword) {
      const query = new URLSearchParams();
      if (page) query.set("page", page);
      setKeyword("");
      router.push(`/recruit?${query.toString()}`);
      return;
    }

    if (hasHistory) {
      router.back();
    } else if (pathname.startsWith("/recruit/") && pathname !== "/recruit") {
      const query = new URLSearchParams();
      if (page) query.set("page", page);
      router.push(`/recruit?${query.toString()}`);
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
