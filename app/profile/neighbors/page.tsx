"use client";

import NeighborCard from "./components/NeighborCard";
import { useNeighborsList } from "./hooks/useNeighborsList";

const ProfileNeighborsPage = () => {
  const { data: neighborsList, isLoading, error } = useNeighborsList();

  if (isLoading) {
    // 로딩 컴포넌트 구현 예정
    return (
      <div className="flex h-full w-full items-center justify-center">
        로딩중...
      </div>
    );
  }

  if (error || !neighborsList) {
    // 에러 컴포넌트 구현 예정
    return (
      <div className="flex h-full w-full items-center justify-center">
        에러가 발생했습니다.
      </div>
    );
  }

  const receiveds = neighborsList.receiveds;
  const neighbors = neighborsList.neighbors;

  return (
    <div className="flex flex-col gap-2 overflow-y-auto">
      <div className="py-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-title-1 px-4 py-2 text-text-primary">
            이웃 신청
          </h3>
          {receiveds.map((received) => (
            <NeighborCard
              key={received.id}
              data={received}
              isMyNeighbor={false}
            />
          ))}
        </div>
        <div className="h-1 w-full bg-border-secondary" />
      </div>
      <div className="">
        <h3 className="text-title-1 px-4 py-3 text-text-primary">내 이웃</h3>
        {neighbors.map((neighbor) => (
          <NeighborCard key={neighbor.id} isMyNeighbor={true} data={neighbor} />
        ))}
      </div>
    </div>
  );
};

export default ProfileNeighborsPage;
