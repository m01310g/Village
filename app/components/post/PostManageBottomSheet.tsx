import Link from "next/link";
import BottomSheetWrapper from "../BottomSheetWrapper";

interface PostManageBottomSheetProps {
  setIsOpen: (isOpen: boolean) => void;
}

const PostManageBottomSheet = ({ setIsOpen }: PostManageBottomSheetProps) => {
  return (
    <BottomSheetWrapper onClose={() => setIsOpen(false)}>
      <div
        className="fixed bottom-0 z-50 w-full max-w-[375px] rounded-t-[20px] bg-background-primary py-5"
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="flex flex-col">
          <Link href={"/post/edit"}>
            <li className="text-body-2 cursor-pointer px-4 py-5 text-neutral-800">
              글 수정
            </li>
          </Link>
          <div className="h-[1px] w-full bg-border-secondary" />
          <li className="text-body-2 cursor-pointer px-4 py-5 text-text-danger">
            글 삭제
          </li>
        </ul>
      </div>
    </BottomSheetWrapper>
  );
};

export default PostManageBottomSheet;
