import { Board } from "@/app/(main)/hooks/useUserProfile";
import { useEffect } from "react";

interface UseSearchResetOptions {
  keyword: string;
  setSearchPage: (page: number) => void;
  setAllSearchedPosts: (posts: Board[]) => void;
}

export const useSearchReset = ({
  keyword,
  setSearchPage,
  setAllSearchedPosts,
}: UseSearchResetOptions) => {
  useEffect(() => {
    setSearchPage(1);
    setAllSearchedPosts([]);
  }, [keyword]);
};
