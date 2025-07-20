import Image from "next/image";
import { useRouter } from "next/navigation";

interface NeighborInfoProps {
  id: number;
  nickname: string;
  name: string;
  profileImage: string;
  isMyNeighbor: number | boolean;
}

const NeighborInfo = ({
  id,
  nickname,
  name,
  profileImage,
  isMyNeighbor,
}: NeighborInfoProps) => {
  const router = useRouter();

  return (
    <div
      className="flex cursor-pointer items-center gap-2"
      onClick={() => router.push(isMyNeighbor === 4 ? "/" : `/${id}`)}
    >
      <div className="flex h-10 w-10 overflow-hidden rounded-full">
        <Image
          src={profileImage}
          width={40}
          height={40}
          alt={`${nickname}의 프로필 사진`}
          placeholder="blur"
          blurDataURL="/logos/symbol.svg"
          className="h-10 w-10"
          unoptimized
        />
      </div>
      <div className="flex items-center gap-[0.375rem]">
        <span className="text-body-2 text-text-primary">{nickname}</span>
        <div className="h-4 w-[1px] bg-neutral-400" />
        <span className="text-body-2 text-neutral-400">{name}</span>
      </div>
    </div>
  );
};

export default NeighborInfo;
