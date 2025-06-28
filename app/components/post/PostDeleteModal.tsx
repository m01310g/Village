import { useRouter } from "next/navigation";
import Button from "../Button";
import ModalWrapper from "../modal/ModalWrapper";
import { useDeletePost } from "./hooks/useDeletePost";

interface PostDeleteModalProps {
  onClose: () => void;
  postId: number;
}

const PostDeleteModal = ({ onClose, postId }: PostDeleteModalProps) => {
  const router = useRouter();

  const handleDelete = () => {
    onClose();
    router.replace("/");
  };

  const deleteMutation = useDeletePost(handleDelete);

  return (
    <ModalWrapper onClose={onClose}>
      <h3 className="text-title-3 text-text-primary">글을 삭제하시겠습니까?</h3>
      <div className="flex w-[319px] gap-2">
        <Button color="secondaryColor" onClick={onClose}>
          취소
        </Button>
        <Button onClick={() => deleteMutation.mutate(postId)}>삭제</Button>
      </div>
    </ModalWrapper>
  );
};

export default PostDeleteModal;
