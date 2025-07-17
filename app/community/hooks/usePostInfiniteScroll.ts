import { RefObject, useEffect } from "react";

interface UsePostInfiniteScrollOptions {
  loaderRef: RefObject<HTMLElement>;
  scrollRef: RefObject<HTMLElement>;
  isLastPage?: boolean;
  isFetching: boolean;
  onLoadMore: () => void;
  enabled?: boolean;
  page: number;
  allPostsLength: number;
}

export const usePostInfiniteScroll = ({
  loaderRef,
  scrollRef,
  isLastPage,
  isFetching,
  onLoadMore,
  enabled = true,
  page,
  allPostsLength,
}: UsePostInfiniteScrollOptions) => {
  useEffect(() => {
    if (!enabled) return;

    const loaderTarget = loaderRef.current;
    const scrollTarget = scrollRef.current;

    if (!loaderTarget) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first.isIntersecting) return;

        if (page === 1 && allPostsLength === 0) return;

        onLoadMore();
      },
      { threshold: 1.0, root: scrollTarget },
    );

    const timeout = setTimeout(() => {
      if (loaderTarget && !isLastPage) {
        observer.observe(loaderTarget);
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
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
