import BackIcon from "@/public/icons/chevron-left.svg";
import SearchIcon from "@/public/icons/icn_search.svg";
import { useState } from "react";
import SearchResult from "./SearchResult";
import { SearchResultType, useSearchProfile } from "./hooks/useSearchProfile";

interface HeaderSearchBarProps {
  onClose: () => void;
}

const HeaderSearchBar = ({ onClose }: HeaderSearchBarProps) => {
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResultType[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const searchProfileMutation = useSearchProfile(keyword);

  const handleSearch = async () => {
    if (!keyword) return;
    searchProfileMutation.mutate(undefined, {
      onSuccess: (data) => {
        setHasSearched(true);
        setSearchResult(data);
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 m-auto max-w-[375px] bg-white px-1">
      <div className="flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex h-[46px] w-[46px] items-center justify-center"
        >
          <BackIcon width="24px" height="24px" color="#171717" />
        </button>
        <form
          className="flex flex-1 gap-1 rounded-[999px] bg-background-secondary px-3 py-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="사용자 검색"
            className="text-body-3 w-full bg-transparent text-text-primary placeholder:text-text-tertiary focus:outline-none"
          />
          <button type="submit">
            <SearchIcon width="24px" height="24px" color="#171717" />
          </button>
        </form>
        <div className="h-[46px] w-[46px]" />
      </div>
      <div className="h-[calc(100vh-46px)] overflow-y-scroll py-3 scrollbar-none">
        {searchResult && searchResult.length > 0 ? (
          searchResult.map((data) => (
            <SearchResult
              key={data.id}
              id={data.id}
              name={data.name}
              nickname={data.nickname}
              profileImage={data.profileImage}
              isNeighbor={data.isNeighbor}
            />
          ))
        ) : hasSearched ? (
          <div className="text-title-1 flex h-full items-center justify-center text-text-primary">
            검색 결과가 없습니다.
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default HeaderSearchBar;
