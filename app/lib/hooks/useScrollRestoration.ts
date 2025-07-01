import { useScrollStore } from "@/store/useScrollStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const useScrollRestoration = (
  scrollRef: React.RefObject<HTMLElement | null>,
) => {
  const pathname = usePathname();
  const { setScroll, getScroll } = useScrollStore();

  useEffect(() => {
    const handleScroll = () => {
      const y = scrollRef.current?.scrollTop ?? 0;
      setScroll(pathname, y);
    };
    const target = scrollRef.current;
    if (!target) return;
    target?.addEventListener("scroll", handleScroll);
    return () => {
      target?.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, setScroll, scrollRef]);

  useEffect(() => {
    const y = getScroll(pathname);

    if (y !== undefined) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: y });
      }, 0);
    }
  }, [pathname, getScroll, scrollRef]);
};
