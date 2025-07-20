import DefaultProfile from "@/public/icons/default-profile.svg";
import CloseIcon from "@/public/icons/close-2.svg";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import { RefObject } from "react";

interface ProfileRegisterModalProps {
  ref: RefObject<HTMLDivElement | null>;
  setShowModal: (visible: boolean) => void;
}

const ProfileRegisterModal = ({
  ref,
  setShowModal,
}: ProfileRegisterModalProps) => {
  const router = useRouter();

  const handleClose = () => {
    setShowModal(false);
  };

  const handleCompleteClick = () => {
    router.push("/edit/info");
  };

  return (
    <div className="w-full gap-2 px-4" ref={ref}>
      <div className="flex flex-col gap-4 rounded-[12px] bg-background-brandSecondary p-3">
        <button className="flex w-full justify-end" onClick={handleClose}>
          <CloseIcon color="#171717" width="24px" height="24px" />
        </button>
        <div className="flex w-full gap-5 px-1.5">
          <DefaultProfile className="shrink-0" />
          <div className="flex flex-col gap-3">
            <h3 className="text-title-3 text-text-primary">
              프로필을 완성해주세요
            </h3>
            <span className="text-body-3 text-text-secondary">
              프로필을 완성하면 빌리지에서 더 많은 사람들과 소통할 수 있어요!
            </span>
          </div>
        </div>
        <Button color="primary" size="lg" onClick={handleCompleteClick}>
          프로필 완성하기
        </Button>
      </div>
    </div>
  );
};

export default ProfileRegisterModal;
