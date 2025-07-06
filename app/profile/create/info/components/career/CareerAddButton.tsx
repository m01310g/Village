import { useState } from "react";
import CareerAddBottomSheet from "./CareerAddBottomSheet";
import { CareerData } from "@/app/profile/types/careerCard";
import AddIcon from "@/public/icons/plus.svg";

interface CareerAddButtonProps {
  onAddCareer: (newCareer: CareerData) => void;
}

const CareerAddButton = ({ onAddCareer }: CareerAddButtonProps) => {
  const [open, setOpen] = useState(false);

  const handleAddButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <button
        className="text-body-2 flex items-center gap-0.5 rounded-[8px] border border-border-secondary px-3 py-2 text-neutral-400 hover:bg-neutral-100"
        onClick={handleAddButtonClick}
      >
        <AddIcon width="16px" height="16px" color="#171717" />
        추가
      </button>
      {open && (
        <CareerAddBottomSheet
          setOpen={setOpen}
          onSave={onAddCareer}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};
export default CareerAddButton;
