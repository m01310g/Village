import Image from "next/image";

interface NeighborInfoProps {
  nickname: string;
  name: string;
  profileImage: string;
}

const NeighborInfo = ({ nickname, name, profileImage }: NeighborInfoProps) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={profileImage}
        width={40}
        height={40}
        alt={`${nickname}의 프로필 사진`}
      />
      <div className="flex items-center gap-[6px]">
        <span className="text-body-2 text-text-primary">{nickname}</span>
        <div className="h-4 w-[1px] bg-neutral-400" />
        <span className="text-body-2 text-neutral-400">{name}</span>
      </div>
    </div>
  );
};

export default NeighborInfo;
