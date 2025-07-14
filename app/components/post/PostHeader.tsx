import { usePathname } from "next/navigation";
import AddNeighborButton from "./AddNeighborButton";
import ManageIcon from "@/public/icons/icn_dot-horizontal.svg";
import { useState } from "react";
import PostManageBottomSheet from "./PostManageBottomSheet";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Board } from "@/app/(main)/hooks/useUserProfile";

interface PostHeaderProps {
  post: Board;
  isMyProfile?: boolean;
  isNeighbor: number;
}

const PostHeader = ({ post, isMyProfile, isNeighbor }: PostHeaderProps) => {
  const pathname = usePathname();
  const [isPostBottomSheetOpen, setIsPostBottomSheetOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <header
        className="flex cursor-pointer items-center justify-between"
        onClick={() =>
          isMyProfile ? router.push("/") : router.push(`/${post.writtenBy.id}`)
        }
      >
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <Image
              src={post.writtenBy.profileImage ?? "/logos/symbol.svg"}
              width={40}
              height={40}
              alt={`${post.writtenBy.nickname}의 프로필 사진`}
              placeholder="blur"
              blurDataURL="/logos/symbol.svg"
              className="h-10 w-10"
              unoptimized
            />
          </div>
          <h3 className="text-title-3">{post.writtenBy.nickname}</h3>
        </div>

        {pathname === "/" ? (
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setIsPostBottomSheetOpen(true);
            }}
          >
            <ManageIcon color="#737373" width="24px" height="24px" />
          </button>
        ) : /^\d+$/.test(pathname.slice(1)) ? (
          <div className="h-10 w-10" />
        ) : pathname === "/community" ? (
          isMyProfile ? (
            <div className="h-10 w-10" />
          ) : (
            <AddNeighborButton id={post.writtenBy.id} isNeighbor={isNeighbor} />
          )
        ) : pathname.startsWith("/post/") ? (
          isMyProfile ? (
            <button
              className="flex h-10 w-10 items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsPostBottomSheetOpen(true);
              }}
            >
              <ManageIcon color="#737373" width="24px" height="24px" />
            </button>
          ) : (
            <div className="h-10 w-10" />
          )
        ) : (
          <div className="h-10 w-10" />
        )}
      </header>
      {isPostBottomSheetOpen && (
        <PostManageBottomSheet
          setIsOpen={setIsPostBottomSheetOpen}
          postId={post.id}
        />
      )}
    </>
  );
};

export default PostHeader;
