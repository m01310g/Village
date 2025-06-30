import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Image from "next/image";
import { useEffect, useState } from "react";
import DateInput from "./date/DateInput";
import { v4 as uuidv4 } from "uuid";
import BottomSheetWrapper from "@/app/components/BottomSheetWrapper";
import { CareerData } from "@/app/profile/types/careerCard";
import Checkbox from "@/app/components/Checkbox";
import clsx from "clsx";

interface CareerAddBottomSheetProps {
  setOpen: (open: boolean) => void;
  onSave: (career: CareerData) => void;
  onClose: () => void;
  initialData?: CareerData | null;
}

const CareerAddBottomSheet = ({
  setOpen,
  onSave,
  onClose,
  initialData,
}: CareerAddBottomSheetProps) => {
  const [center, setCenter] = useState(initialData?.workplace ?? "");
  const [startDate, setStartDate] = useState(initialData?.startDate ?? "");
  const [endDate, setEndDate] = useState(initialData?.endDate ?? "");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (initialData?.isCurrent) {
      setIsChecked(true);
      setEndDate("현재 근무중");
    } else if (initialData) {
      setIsChecked(false);
      setEndDate(initialData.endDate || "");
    }
  }, [initialData]);

  const handleSave = () => {
    onSave({
      id: initialData?.id ?? uuidv4(),
      workplace: center,
      startDate,
      endDate,
      isCurrent: isChecked,
    });

    onClose();
  };

  const isCareerValid = !!center && !!startDate && (isChecked || !!endDate);

  const handleCloseButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setOpen(false);
  };

  return (
    <BottomSheetWrapper onClose={() => setOpen(false)} className="h-full">
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
        <main className="flex flex-col gap-[6px]">
          <div className="flex flex-col items-center justify-center gap-4">
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
                disabled={isChecked}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 py-[5.5px]">
            <Checkbox
              disabled={!startDate}
              isChecked={isChecked}
              onClick={() => {
                setIsChecked((prev) => {
                  const next = !prev;
                  setEndDate(next ? "현재 근무 중" : "");
                  return next;
                });
              }}
            />
            <span
              className={clsx(
                "text-caption-2",
                !startDate ? "text-text-disabled" : "text-text-primary",
              )}
            >
              현재 근무 중
            </span>
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
    </BottomSheetWrapper>
  );
};

export default CareerAddBottomSheet;
