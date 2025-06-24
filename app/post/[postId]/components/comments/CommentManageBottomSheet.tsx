import BottomSheetWrapper from "@/app/components/BottomSheetWrapper";
import { Dispatch, SetStateAction, useState } from "react";
import CommentDeleteModal from "./CommentDeleteModal";

interface CommentManageBottomSheetProps {
  commentId: number;
  setIsOpen: (isOpen: boolean) => void;
  setComments: Dispatch<SetStateAction<CommentType[]>>;
}

const CommentManageBottomSheet = ({
  commentId,
  setIsOpen,
  setComments,
}: CommentManageBottomSheetProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <BottomSheetWrapper onClose={() => setIsOpen(false)}>
        <div
          className="fixed bottom-0 z-50 w-full max-w-[375px] rounded-t-[20px] bg-background-primary py-5"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="text-body-2 flex w-full cursor-pointer flex-col px-4 py-5 text-start text-text-danger"
            onClick={() => setIsModalOpen(true)}
          >
            삭제하기
          </button>
        </div>
      </BottomSheetWrapper>
      {isModalOpen && (
        <CommentDeleteModal
          setIsModalOpen={setIsModalOpen}
          commentId={commentId}
          setComments={setComments}
        />
      )}
    </>
  );
};

export default CommentManageBottomSheet;
