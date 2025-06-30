import { ErrorResponse } from "@/app/types/ErrorResponse";
import BackIcon from "@/public/icons/chevron-left.svg";
import SearchIcon from "@/public/icons/icn_search.svg";
import { useState } from "react";
import SearchResult from "./SearchResult";

interface HeaderSearchBarProps {
  onClose: () => void;
}

const HeaderSearchBar = ({ onClose }: HeaderSearchBarProps) => {
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState<
    {
      id: number;
      name: string;
      nickname: string;
      isNeighbor: number;
      profileImage: string;
    }[]
  >([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!keyword) return;

    setHasSearched(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-profile/searchWebProfile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword }),
      },
    );

    if (!res.ok) {
      const error: ErrorResponse = await res.json();
      if (error.statusCode === 400) {
        console.error("데이터 형식 오류:", error.message);
      } else if (error.statusCode === 401) {
        console.error("유효하지 않거나 기간이 만료된 토큰:", error.message);
      } else {
        console.error("사용자 검색 실패:", error.message);
      }
    }

    const result = await res.json();
    const data = result.data;

    setSearchResult(data);

    return data;
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
        <div className="flex flex-1 gap-1 rounded-[999px] bg-background-secondary px-3 py-2">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="사용자 검색"
            className="text-body-3 w-full bg-transparent text-text-primary placeholder:text-text-tertiary focus:outline-none"
          />
          <button onClick={handleSearch}>
            <SearchIcon width="24px" height="24px" color="#171717" />
          </button>
        </div>
        <div className="h-[46px] w-[46px]" />
      </div>
      <div className="scrollbar-none h-[calc(100vh-46px)] overflow-y-scroll py-3">
        {searchResult.length > 0 ? (
          searchResult.map((data) => (
            <SearchResult
              key={data.id}
              id={data.id}
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
