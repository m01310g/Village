import Button from "@/app/components/Button";
import ModalWrapper from "@/app/components/modal/ModalWrapper";
import { useDeleteComment } from "../../hooks/useDeleteComment";
import { Dispatch, SetStateAction } from "react";

interface CommentDeleteModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
  commentId: number;
  setComments: Dispatch<SetStateAction<CommentType[]>>;
}

const CommentDeleteModal = ({
  setIsModalOpen,
  commentId,
  setComments,
}: CommentDeleteModalProps) => {
  const deleteCommentMutation = useDeleteComment();
  const handleDelete = () => {
    deleteCommentMutation.mutate(commentId, {
      onSuccess: () => {
        setComments((prev) =>
          prev.filter((comment) => comment.id !== commentId),
        );
        setIsModalOpen(false);
      },
    });
  };

  return (
    <ModalWrapper onClose={() => setIsModalOpen(false)}>
      <h3 className="text-title-3 text-text-primary">
        댓글을 삭제하시겠습니까?
      </h3>
      <div className="flex w-[319px] gap-2">
        <Button color="secondaryColor" onClick={() => setIsModalOpen(false)}>
          취소
        </Button>
        <Button onClick={handleDelete}>삭제</Button>
      </div>
    </ModalWrapper>
  );
};

export default CommentDeleteModal;
