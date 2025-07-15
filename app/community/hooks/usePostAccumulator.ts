import { Board } from "@/app/(main)/hooks/useUserProfile";
import { useEffect } from "react";

interface PostList {
  boardList: Board[];
}

interface UsePostAccumulatorOptions {
  postList?: PostList;
  setAllPosts: (posts: Board[] | ((prev: Board[]) => Board[])) => void;
}

export const usePostAccumulator = ({
  postList,
  setAllPosts,
}: UsePostAccumulatorOptions) => {
  useEffect(() => {
    if (postList?.boardList) {
      setAllPosts((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        const newUniquePosts = postList.boardList.filter((p) => !ids.has(p.id));
        return [...prev, ...newUniquePosts];
      });
    }
  }, [postList, setAllPosts]);
};
