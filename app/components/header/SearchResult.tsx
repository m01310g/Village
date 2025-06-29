import Image from "next/image";
import { useRouter } from "next/navigation";
import AddNeighborButton from "../post/AddNeighborButton";
import { useAuthStore } from "@/store/useAuthStore";

interface SearchResultProps {
  id: number;
  nickname: string;
  profileImage: string;
  isNeighbor: number;
}

const SearchResult = ({
  id,
  nickname,
  profileImage,
  isNeighbor,
}: SearchResultProps) => {
  const router = useRouter();
  const userId = useAuthStore((state) => state.user?.id);
  const isMyProfile = id === userId;

  return (
    <div
      className="flex cursor-pointer items-center justify-between px-3 py-3"
      onClick={() =>
        isMyProfile ? router.push("/profile") : router.push(`/profile/${id}`)
      }
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={profileImage === "url" ? "/logos/symbol.svg" : profileImage}
            width={40}
            height={40}
            alt={`${nickname}의 프로필 사진`}
          />
        </div>
        <h3 className="text-title-3">{nickname}</h3>
      </div>

      {isNeighbor || isMyProfile ? (
        <div className="h-10 w-10" />
      ) : (
        <AddNeighborButton id={id} isNeighbor={isNeighbor} />
      )}
    </div>
  );
};

export default SearchResult;
