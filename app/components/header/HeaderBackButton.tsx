"use client";

import BackIcon from "@/public/icons/chevron-left.svg";
import { useSearchKeywordStore } from "@/store/useSearchKeywordStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const HeaderBackButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { keyword, setKeyword } = useSearchKeywordStore();

  const hasHistoryRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.history.length > 2) {
      hasHistoryRef.current = true;
    }
  }, []);

  const handleBack = () => {
    const page = searchParams.get("page");

    if (pathname === "/create/info") {
      router.replace("/");
      return;
    }

    if (keyword) {
      const query = new URLSearchParams();
      if (page) query.set("page", page);
      setKeyword("");
      router.push(`/recruit?${query.toString()}`);
      return;
    }

    if (hasHistoryRef.current) {
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
