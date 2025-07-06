"use client";

import {
  SearchResultType,
  useSearchProfile,
} from "@/app/components/header/hooks/useSearchProfile";
import SearchIcon from "@/public/icons/icn_search.svg";
import CloseIcon from "@/public/icons/close-2.svg";
import { useEffect, useState } from "react";

interface NeighborsHeaderProps {
  onSearchResult: (results: SearchResultType[]) => void;
  onClearSearch: () => void;
}

const NeighborsHeader = ({
  onSearchResult,
  onClearSearch,
}: NeighborsHeaderProps) => {
  const [keyword, setKeyword] = useState("");
  const searchProfileMutation = useSearchProfile(keyword);

  useEffect(() => {
    if (keyword === "") {
      onClearSearch();
    }
  }, [keyword, onClearSearch]);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!keyword) return;
    searchProfileMutation.mutate(undefined, {
      onSuccess: (data) => {
        onSearchResult(data);
      },
    });
  };

  const handleClose = () => {
    setKeyword("");
    onClearSearch();
  };

  return (
    <header className="flex h-[46px] items-center justify-center bg-background-primary px-4">
      <form
        className="flex w-full justify-between rounded-[999px] bg-background-secondary px-3 py-2"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="사용자 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="text-body-3 w-full bg-transparent text-text-primary placeholder:text-text-tertiary focus:outline-none"
        />
        {keyword ? (
          <button
            type="button"
            className="flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full bg-neutral-400"
            onClick={handleClose}
          >
            <CloseIcon
              color="#ffffff"
              width="16px"
              height="16px"
              className="shrink-0"
            />
          </button>
        ) : (
          <button type="submit">
            <SearchIcon width="24px" height="24px" color="#171717" />
          </button>
        )}
      </form>
    </header>
  );
};

export default NeighborsHeader;
