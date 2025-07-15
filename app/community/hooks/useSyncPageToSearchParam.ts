import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const useSyncPageToSearchParam = (page: number) => {
  const pathname = usePathname();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", String(page));
    const newUrl = `${pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [page, pathname]);
};
