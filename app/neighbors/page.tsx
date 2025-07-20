"use client";

import { useAllUsers } from "./hooks/useAllUsers";
import SearchResult from "../components/header/SearchResult";
import NeighborsHeader from "./components/NeighborsHeader";
import { useState } from "react";
import { SearchResultType } from "../components/header/hooks/useSearchProfile";

const NeighborsPage = () => {
  const { data: users } = useAllUsers();
  const [searchResults, setSearchResults] = useState<SearchResultType[] | null>(
    null,
  );

  const handleSearchResult = (results: SearchResultType[]) => {
    setSearchResults(results);
  };

  const handleClearSearch = () => {
    setSearchResults(null);
  };

  const renderUsers = searchResults ?? users;

  return (
    <>
      <NeighborsHeader
        onSearchResult={handleSearchResult}
        onClearSearch={handleClearSearch}
      />
      <main className="h-[calc(100dvh-81px-46px-env(safe-area-inset-bottom))] overflow-y-auto bg-background-primary scrollbar-thin">
        {renderUsers && renderUsers.length > 0 ? (
          renderUsers?.map((user) => (
            <SearchResult
              key={user.id}
              id={user.id}
              nickname={user.nickname}
              name={user.name}
              isNeighbor={user.isNeighbor}
              profileImage={user.profileImage}
            />
          ))
        ) : (
          <div className="text-body-2 flex h-full flex-col items-center justify-center text-text-tertiary">
            <span>검색 결과가 없습니다.</span>
            <span>다른 이름이나 별명을 입력해보세요.</span>
          </div>
        )}
      </main>
    </>
  );
};

export default NeighborsPage;
