import { useRequestNeighbor } from "@/app/profile/[userId]/hooks/useRequestNeighbor";
import AddUser from "@/public/icons/icn_user-profile-add-01.svg";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import LoginRequiredModal from "../LoginRequiredModal";

interface AddNeighborButtonProps {
  id: number;
  isNeighbor: number;
}

const AddNeighborButton = ({ id, isNeighbor }: AddNeighborButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const requestNeighborMutation = useRequestNeighbor(id);
  const accessToken = useAuthStore.getState().accessToken;

  const handleRequestNeighbor = () => {
    if (!accessToken) {
      setIsModalOpen(true);
      return;
    }

    requestNeighborMutation.mutate();
  };

  return isNeighbor === 0 ? (
    <>
      <button
        className="flex h-8 items-center justify-center gap-1 px-2 py-[9px]"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleRequestNeighbor();
        }}
      >
        <AddUser color="#00a6f4" width="16px" height="16px" />
        <span className="text-title-4 text-text-onsecondary">이웃 신청</span>
      </button>
      {isModalOpen && <LoginRequiredModal setIsModalOpen={setIsModalOpen} />}
    </>
  ) : isNeighbor === 2 ? (
    <button
      className="flex h-8 cursor-default items-center justify-center gap-1 px-2 py-[9px]"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <AddUser color="#737373" width="16px" height="16px" />
      <span className="text-title-4 text-text-tertiary">요청중</span>
    </button>
  ) : (
    <div></div>
  );
};

export default AddNeighborButton;
