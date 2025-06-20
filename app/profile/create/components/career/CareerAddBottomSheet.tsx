import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Image from "next/image";
import { useState } from "react";
import DateInput from "./date/DateInput";
import { CareerCardProps } from "../../types/careerCard";

interface CareerAddBottomSheetProps {
  setOpen: (open: boolean) => void;
  onSave: (career: CareerCardProps) => void;
  onClose: () => void;
}

const CareerAddBottomSheet = ({
  setOpen,
  onSave,
  onClose,
}: CareerAddBottomSheetProps) => {
  const [center, setCenter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSave = () => {
    onSave({
      workplace: center,
      startDate,
      endDate,
    });

    onClose();
  };

  const isCareerValid = !!center && !!startDate && !!endDate;

  const handleCloseButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex h-full items-end justify-center">
      <div className="absolute z-0 h-full w-full max-w-[375px] bg-neutral-950/45" />
      <div className="relative flex h-full w-full max-w-[375px] flex-col gap-3 rounded-t-[20px] bg-background-primary px-4 pb-10 pt-5">
        <header className="flex w-full gap-2 py-2">
          <button onClick={handleCloseButton}>
            <Image
              src={"/icons/close-2.svg"}
              width={24}
              height={24}
              alt="닫기 버튼"
            />
          </button>
          <h2 className="text-title-1 text-text-primary">경력사항</h2>
        </header>
        <main className="flex flex-col items-center justify-center gap-4">
          <Input
            label=""
            placeholder="근무한 센터명"
            value={center}
            onChange={(e) => setCenter(e.target.value)}
          />
          <div className="flex w-full items-center justify-center gap-4">
            <DateInput
              placeholder="근무 시작일"
              value={startDate}
              setDate={setStartDate}
              isStartDate
              endDate={endDate}
            />
            <div className="h-[1px] w-3 bg-border-secondary" />
            <DateInput
              placeholder="근무 종료일"
              value={endDate}
              setDate={setEndDate}
              isEndDate
              startDate={startDate}
            />
          </div>
        </main>
        <div className="fixed bottom-0 flex justify-center gap-[6px] py-5">
          <Button size="md" color="secondaryColor" onClick={handleCloseButton}>
            취소
          </Button>
          <Button
            size="md"
            color="primary"
            onClick={handleSave}
            disabled={!isCareerValid}
          >
            저장
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CareerAddBottomSheet;
