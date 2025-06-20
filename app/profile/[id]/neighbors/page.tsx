"use client";

import NeighborCard from "./components/NeighborCard";

const ProfileNeighborsPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="py-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-title-1 px-4 py-2 text-text-primary">
            이웃 신청
          </h3>
          {/* 각 props 전달 */}
          <NeighborCard
            nickname="이웃 신청"
            name="이웃 이름"
            isMyNeighbor={false}
          />
        </div>
        <div className="h-1 w-full bg-border-secondary" />
      </div>
      <div className="">
        <h3 className="text-title-1 px-4 py-3 text-text-primary">내 이웃</h3>
        {/* 각 props 전달 */}
        <NeighborCard nickname="내 이웃" name="이웃 이름" isMyNeighbor={true} />
      </div>
    </div>
  );
};

export default ProfileNeighborsPage;
