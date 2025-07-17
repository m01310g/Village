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

        if (isLastPage) return;

        onLoadMore();
      },
      { threshold: 1.0, root: scrollRef.current },
    );

    const target = loaderRef.current;

    const timeout = setTimeout(() => {
      if (target && !isLastPage) {
        observer.observe(target);
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (target) observer.unobserve(target);
    };
  }, [
    loaderRef.current,
    scrollRef,
    isLastPage,
    onLoadMore,
    enabled,
    page,
    allPostsLength,
  ]);
};
