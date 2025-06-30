"use client";

import { useParams } from "next/navigation";
import NeighborCard from "../../neighbors/components/NeighborCard";
import { useNeighborsById } from "../hooks/useNeighborsById";

const ProfileNeighborsByUserIdPage = () => {
  const params = useParams();
  const userId = Number(params.userId);
  const { data: neighbors } = useNeighborsById(userId);

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h3 className="text-title-1 px-4 py-3 text-text-primary">이웃</h3>
        {neighbors &&
          neighbors.map((neighbor) => (
            <NeighborCard
              key={neighbor.id}
              isMyNeighbor={neighbor.isNeighbor}
              data={neighbor}
            />
          ))}
      </div>
    </div>
  );
};

export default ProfileNeighborsByUserIdPage;
