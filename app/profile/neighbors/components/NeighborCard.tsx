import NeighborButtons from "./NeighborButtons";
import NeighborInfo from "./NeighborInfo";

interface NeighborCardProps {
  isMyNeighbor: boolean | number;
  data: {
    id: number;
    nickname: string;
    name: string;
    profileImage: string;
  };
}

const NeighborCard = ({ data, isMyNeighbor }: NeighborCardProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-between px-4 py-3">
        <NeighborInfo
          id={data.id}
          nickname={data.nickname}
          name={data.name}
          profileImage={data.profileImage || "/logos/symbol.svg"}
          isMyNeighbor={isMyNeighbor}
        />
        {/* 이웃 여부 판단 */}
        <NeighborButtons
          isMyNeighbor={isMyNeighbor}
          id={data.id}
          nickname={data.nickname}
        />
      </div>
      <div className="h-[1px] w-full bg-border-secondary" />
    </div>
  );
};

export default NeighborCard;
