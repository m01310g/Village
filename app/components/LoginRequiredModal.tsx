import Button from "./Button";
import ModalWrapper from "./modal/ModalWrapper";

interface LoginRequiredModalProps {
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const LoginRequiredModal = ({ setIsModalOpen }: LoginRequiredModalProps) => {
  return (
    <ModalWrapper onClose={() => setIsModalOpen(false)}>
      <h3 className="text-title-3 text-text-primary">
        로그인이 필요한 서비스입니다.
      </h3>
      <Button onClick={() => setIsModalOpen(false)}>확인</Button>
    </ModalWrapper>
  );
};

export default LoginRequiredModal;
