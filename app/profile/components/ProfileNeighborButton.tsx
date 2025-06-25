import Button from "@/app/components/Button";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRequestNeighbor } from "../[userId]/hooks/useRequestNeighbor";

interface ProfileNeighborButtonProps {
  isNeighbor: number;
  id: number;
}

const ProfileNeighborButton = ({
  isNeighbor,
  id,
}: ProfileNeighborButtonProps) => {
  const router = useRouter();
  const accessToken = useAuthStore.getState().accessToken;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonState, setButtonState] = useState(isNeighbor);
  const requestNeighborMutation = useRequestNeighbor(id);

  if (!accessToken) {
    setIsModalOpen(true);
  }

  const handleRequestNeighbor = () => {
    setButtonState(2);

    requestNeighborMutation.mutate();
  };

  return buttonState === 0 ? (
    <>
      <Button size="lg" color="primary" onClick={handleRequestNeighbor}>
        이웃 맺기
      </Button>
      {isModalOpen && <LoginRequiredModal setIsModalOpen={setIsModalOpen} />}
    </>
  ) : buttonState === 1 ? (
    <Button size="lg" color="secondaryColor">
      이웃
    </Button>
  ) : buttonState === 2 ? (
    <Button size="lg" color="secondaryColor">
      요청 중
    </Button>
  ) : (
    <Button
      size="lg"
      color="secondaryColor"
      onClick={() => router.push("/profile/neighbors")}
    >
      요청 받으러 가기
    </Button>
  );
};

export default ProfileNeighborButton;
