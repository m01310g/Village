import BottomSheetWrapper from "@/app/components/BottomSheetWrapper";

interface CommentManageBottomSheetProps {
  setIsOpen: (isOpen: boolean) => void;
}

const CommentManageBottomSheet = ({
  setIsOpen,
}: CommentManageBottomSheetProps) => {
  return (
    <BottomSheetWrapper onClose={() => setIsOpen(false)}>
      <div
        className="fixed bottom-0 z-50 w-full max-w-[375px] rounded-t-[20px] bg-background-primary py-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="text-body-2 flex cursor-pointer flex-col px-4 py-5 text-text-danger">
          삭제하기
        </button>
      </div>
    </BottomSheetWrapper>
  );
};

export default CommentManageBottomSheet;
