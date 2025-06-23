import { usePathname } from "next/navigation";
import AddNeighborButton from "./AddNeighborButton";
import ManageIcon from "@/public/icons/icn_dot-horizontal.svg";
import { useState } from "react";
import PostManageBottomSheet from "./PostManageBottomSheet";
import Image from "next/image";

interface PostHeaderProps {
  profileImage?: string;
  nickname: string;
  isNeighbor: boolean;
  isMyProfile?: boolean;
}

const PostHeader = ({
  profileImage,
  nickname,
  isNeighbor,
  isMyProfile,
}: PostHeaderProps) => {
  const pathname = usePathname();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <Image
              src={profileImage || ""}
              width={40}
              height={40}
              alt={`${nickname}의 프로필 사진`}
            />
          </div>
          <h3 className="text-title-3">{nickname}</h3>
        </div>
        {pathname.includes("/profile") ? (
          isMyProfile ? (
            <button
              className="flex h-10 w-10 items-center justify-center"
              onClick={() => setIsBottomSheetOpen(true)}
            >
              <ManageIcon color="#737373" width="24px" height="24px" />
            </button>
          ) : isNeighbor ? (
            <div className="h-10 w-10" />
          ) : (
            <div className="h-10 w-10" />
          )
        ) : isNeighbor ? (
          <div className="h-10 w-10" />
        ) : (
          <AddNeighborButton />
        )}
      </header>
      {isBottomSheetOpen && (
        <PostManageBottomSheet setIsOpen={setIsBottomSheetOpen} />
      )}
    </>
  );
};

export default PostHeader;
