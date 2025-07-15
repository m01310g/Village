import { RefObject, useEffect } from "react";

interface UsePostInfiniteScrollOptions {
  loaderRef: RefObject<HTMLElement>;
  scrollRef: RefObject<HTMLElement>;
  isLastPage?: boolean;
  onLoadMore: () => void;
  enabled?: boolean;
  page: number;
  allPostsLength: number;
}

export const usePostInfiniteScroll = ({
  loaderRef,
  scrollRef,
  isLastPage,
  onLoadMore,
  enabled = true,
  page,
  allPostsLength,
}: UsePostInfiniteScrollOptions) => {
  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first.isIntersecting) return;

        if (page === 1 && allPostsLength === 0) return;

        if (!isLastPage) {
          onLoadMore();
        }
      },
      { threshold: 0.5, root: scrollRef.current },
    );

    const timeout = setTimeout(() => {
      const current = loaderRef.current;
      if (current && !isLastPage) {
        observer.observe(current);
      }
    }, 100);

    const current = loaderRef.current;
    return () => {
      clearTimeout(timeout);
      if (current) observer.unobserve(current);
    };
  }, [
    loaderRef,
    scrollRef,
    isLastPage,
    onLoadMore,
    enabled,
    page,
    allPostsLength,
  ]);
};
