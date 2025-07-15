import { useEffect } from "react";
import { useSearchStore } from "../store/useSearchStore";

interface UseSearchResetOptions {
  keyword: string;
}

export const useSearchReset = ({ keyword }: UseSearchResetOptions) => {
  const { reset } = useSearchStore();

  useEffect(() => {
    reset();
  }, [keyword, reset]);
};
