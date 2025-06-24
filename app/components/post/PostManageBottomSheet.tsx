import Link from "next/link";
import BottomSheetWrapper from "../BottomSheetWrapper";
import { useState } from "react";
import PostDeleteModal from "./PostDeleteModal";

interface PostManageBottomSheetProps {
  setIsOpen: (isOpen: boolean) => void;
  postId: number;
}

const PostManageBottomSheet = ({
  setIsOpen,
  postId,
}: PostManageBottomSheetProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <BottomSheetWrapper onClose={() => setIsOpen(false)}>
        <div
          className="fixed bottom-0 z-50 w-full max-w-[375px] rounded-t-[20px] bg-background-primary py-5"
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="flex flex-col">
            <Link href={`/post/${postId}/edit`}>
              <li className="text-body-2 cursor-pointer px-4 py-5 text-neutral-800">
                글 수정
              </li>
            </Link>
            <div className="h-[1px] w-full bg-border-secondary" />
            <li
              className="text-body-2 cursor-pointer px-4 py-5 text-text-danger"
              onClick={() => setIsModalOpen(true)}
            >
              글 삭제
            </li>
          </ul>
        </div>
      </BottomSheetWrapper>
      {isModalOpen && (
        <PostDeleteModal
          postId={postId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default PostManageBottomSheet;
