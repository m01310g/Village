"use client";

import { useEffect } from "react";
import { useSetHeader } from "../components/header/HeaderContext";
import { useAllUsers } from "./hooks/useAllUsers";
import SearchResult from "../components/header/SearchResult";

const NeighborsPage = () => {
  const { data: users } = useAllUsers();
  const setHeader = useSetHeader();

  useEffect(() => {
    setHeader({ title: "이웃", showSearchButton: true });
  }, [setHeader]);

  return (
    <main className="h-[calc(100vh-46px-81px)] overflow-y-auto bg-background-primary">
      {users?.map((user) => (
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
  );
};

export default NeighborsPage;
