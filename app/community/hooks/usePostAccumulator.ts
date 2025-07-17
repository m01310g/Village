import { Board } from "@/app/(main)/hooks/useUserProfile";
import { useEffect, useRef } from "react";

interface UsePostAccumulatorOptions {
  postList?: Board[];
  setAllPosts: (posts: Board[] | ((prev: Board[]) => Board[])) => void;
}

export const usePostAccumulator = ({
  postList,
  setAllPosts,
}: UsePostAccumulatorOptions) => {
  const lastPostIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!postList || postList.length === 0) return;

    const newPosts = postList.filter(
      (p) => !lastPostIdsRef.current.has(String(p.id)),
    );

    if (newPosts.length > 0) {
      newPosts.forEach((p) => lastPostIdsRef.current.add(String(p.id)));
      setAllPosts((prev) => [...prev, ...newPosts]);
    }
  }, [postList, setAllPosts]);
};
