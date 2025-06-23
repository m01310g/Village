import NeighborButtons from "./NeighborButtons";
import NeighborInfo from "./NeighborInfo";

interface NeighborCardProps {
  nickname: string;
  name: string;
  isMyNeighbor: boolean;
  profileImage: string;
}

const NeighborCard = ({
  nickname,
  name,
  isMyNeighbor,
  profileImage,
}: NeighborCardProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-between px-4 py-3">
        <NeighborInfo
          nickname={nickname}
          name={name}
          profileImage={profileImage}
        />
        {/* 이웃 여부 판단 */}
        <NeighborButtons isMyNeighbor={isMyNeighbor} nickname={nickname} />
      </div>
      <div className="h-[1px] w-full bg-border-secondary" />
    </div>
  );
};

export default NeighborCard;
