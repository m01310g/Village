import { ErrorResponse } from "@/app/types/ErrorResponse";
import BackIcon from "@/public/icons/chevron-left.svg";
import SearchIcon from "@/public/icons/icn_search.svg";
import { useState } from "react";

interface HeaderSearchBarProps {
  onClose: () => void;
}

const HeaderSearchBar = ({ onClose }: HeaderSearchBarProps) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = async () => {
    if (!keyword) return;

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
    console.log(result);
    const data = result.data;

    console.log(data);

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
            placeholder="검색어를 입력하세요"
            className="text-body-3 w-full bg-transparent text-text-primary placeholder:text-text-tertiary focus:outline-none"
          />
          <button onClick={handleSearch}>
            <SearchIcon width="24px" height="24px" color="#171717" />
          </button>
        </div>
        <div className="h-[46px] w-[46px]" />
      </div>
    </div>
  );
};

export default HeaderSearchBar;
