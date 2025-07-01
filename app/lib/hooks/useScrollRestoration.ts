import { useScrollStore } from "@/store/useScrollStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const useScrollRestoration = (
  scrollRef: React.RefObject<HTMLElement | null>,
  filter?: string,
) => {
  const pathname = usePathname();
  const pathnameKey = filter ? `${pathname}?filter=${filter}` : pathname;
  const { setScroll, getScroll } = useScrollStore();

  useEffect(() => {
    const handleScroll = () => {
      const y = scrollRef.current?.scrollTop ?? 0;
      setScroll(pathnameKey, y);
    };
    const target = scrollRef.current;
    if (!target) return;
    target.addEventListener("scroll", handleScroll);
    return () => {
      target.removeEventListener("scroll", handleScroll);
    };
  }, [pathnameKey, setScroll, scrollRef]);

  useEffect(() => {
    const y = getScroll(pathnameKey);

    if (y !== undefined) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: y });
      }, 0);
    }
  }, [pathnameKey, getScroll, scrollRef]);
};
