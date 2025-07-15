import { Board } from "@/app/(main)/hooks/useUserProfile";
import { useEffect } from "react";
import { useSearchStore } from "../store/useSearchStore";

interface UseSearchResetOptions {
  keyword: string;
}

export const useSearchReset = ({ keyword }: UseSearchResetOptions) => {
  const { reset } = useSearchStore();

  useEffect(() => {
    if (!keyword) reset();
  }, [keyword]);
};
