import { Board } from "@/app/(main)/hooks/useUserProfile";
import { POST_FILTERS } from "../constants/postFilters";

export const useFilteredPosts = (
  allPosts: Board[],
  activeFilter: string,
): Board[] => {
  if (activeFilter === "전체") return allPosts;

  const typeIndex = POST_FILTERS.indexOf(activeFilter) - 1;
  return allPosts.filter((post) => post.type === typeIndex);
};
