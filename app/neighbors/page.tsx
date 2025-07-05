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
      <main className="h-[calc(100vh-46px-81px)] overflow-y-auto bg-background-primary">
        {renderUsers?.map((user) => (
          <SearchResult
            key={user.id}
            id={user.id}
            nickname={user.nickname}
            name={user.name}
            isNeighbor={user.isNeighbor}
            profileImage={user.profileImage}
          />
        ))}
      </main>
    </>
  );
};

export default NeighborsPage;
