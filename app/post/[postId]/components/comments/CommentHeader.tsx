import { Dispatch, SetStateAction, useState } from "react";
import CommentManageBottomSheet from "./CommentManageBottomSheet";
import ManageIcon from "@/public/icons/icn_dot-horizontal.svg";
import Image from "next/image";
import { CommentType } from "./types/commentType";
import { useRouter } from "next/navigation";
import { useIsLoggedIn } from "@/app/hooks/useIsLoggedIn";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

interface CommentHeaderProps {
  comment: CommentType;
  isMyProfile: boolean;
  setComments: Dispatch<SetStateAction<CommentType[]>>;
}

const CommentHeader = ({
  comment,
  isMyProfile,
  setComments,
}: CommentHeaderProps) => {
  const [isCommentBottomSheetOpen, setIsCommentBottomSheetOpen] =
    useState(false);
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleClick = () => {
    if (isLoggedIn) {
      router.push(`/${comment.writtenBy.id}`);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <header
        className="flex cursor-pointer items-center justify-between"
        onClick={handleClick}
      >
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <Image
              src={comment.writtenBy.profileImage ?? "/logos/symbol.svg"}
              width={40}
              height={40}
              alt={`${comment.writtenBy.nickname}의 프로필 사진`}
              placeholder="blur"
              blurDataURL="/logos/symbol.svg"
              className="h-10 w-10"
              unoptimized
            />
          </div>
          <h3 className="text-title-3">{comment.writtenBy.nickname}</h3>
        </div>

        {isMyProfile ? (
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setIsCommentBottomSheetOpen(true);
            }}
          >
            <ManageIcon color="#737373" width="24px" height="24px" />
          </button>
        ) : (
          <div className="h-10 w-10" />
        )}
      </header>
      {isCommentBottomSheetOpen && (
        <CommentManageBottomSheet
          commentId={comment.id}
          setIsOpen={setIsCommentBottomSheetOpen}
          setComments={setComments}
        />
      )}
      {showLoginModal && (
        <LoginRequiredModal setIsModalOpen={setShowLoginModal} />
      )}
    </>
  );
};

export default CommentHeader;
