import Image from "next/image";
import { useRouter } from "next/navigation";
import AddNeighborButton from "../post/AddNeighborButton";

interface SearchResultProps {
  id: number;
  nickname: string;
  name: string;
  profileImage: string;
  isNeighbor: number;
}

const SearchResult = ({
  id,
  nickname,
  name,
  profileImage,
  isNeighbor,
}: SearchResultProps) => {
  const router = useRouter();
  const isMyProfile = isNeighbor === 4;

  return (
    <div
      className="flex cursor-pointer items-center justify-between gap-2 border-b-[1px] border-border-primary px-4 py-3"
      onClick={() =>
        isMyProfile ? router.push("/profile") : router.push(`/profile/${id}`)
      }
    >
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={profileImage ?? "/logos/symbol.svg"}
            width={40}
            height={40}
            alt={`${nickname}의 프로필 사진`}
          />
        </div>
        <h3 className="text-body-2 text-text-primary">{nickname}</h3>
        <div className="h-4 w-[1px] bg-neutral-400" />
        <h3 className="text-body-2 text-neutral-400">{name}</h3>
      </div>

      {isNeighbor === 1 || isMyProfile ? (
        <div className="h-10 w-10" />
      ) : (
        <AddNeighborButton id={id} isNeighbor={isNeighbor} />
      )}
    </div>
  );
};

export default SearchResult;
