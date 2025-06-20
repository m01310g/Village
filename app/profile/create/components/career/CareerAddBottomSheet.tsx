import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Image from "next/image";
import { useState } from "react";
import DateInput from "./DateInput";

interface CareerAddBottomSheetProps {
  setOpen: (open: boolean) => void;
}

const CareerAddBottomSheet = ({ setOpen }: CareerAddBottomSheetProps) => {
  const [center, setCenter] = useState("");

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
            <DateInput placeholder="근무 시작일" />
            <div className="h-[1px] w-3 bg-border-secondary" />
            <DateInput placeholder="근무 종료일" />
          </div>
        </main>
        <div className="fixed bottom-0 flex justify-center gap-[6px] py-5">
          <Button size="md" color="secondaryColor" onClick={handleCloseButton}>
            취소
          </Button>
          <Button size="md" color="primary">
            저장
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CareerAddBottomSheet;
