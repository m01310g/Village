import { Dispatch, SetStateAction, useState } from "react";
import ProfileLabel from "../../components/ProfileLabel";
import BottomSheetWrapper from "@/app/components/BottomSheetWrapper";

interface JobSeekingStatusSectionProps {
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
}

const JobSeekingStatusSection = ({
  status,
  setStatus,
}: JobSeekingStatusSectionProps) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <>
      <section className="flex flex-col gap-3">
        <ProfileLabel label="구직 상태" required bold />
        <div
          className="text-body-2 w-full cursor-pointer rounded-[4px] border border-border-secondary p-3 text-neutral-900"
          onClick={() => setIsBottomSheetOpen(true)}
        >
          {status}
        </div>
      </section>
      {isBottomSheetOpen && (
        <BottomSheetWrapper onClose={() => setIsBottomSheetOpen(false)}>
          <div className="flex flex-col gap-3 py-5">
            <h3 className="text-title-1 w-full px-4 py-2 text-text-primary">
              구직 상태
            </h3>
            <ul className="text-body-2 text-neutral-800">
              <li
                className="cursor-pointer px-4 py-5"
                onClick={() => {
                  setStatus("구직 중이에요");
                  setIsBottomSheetOpen(false);
                }}
              >
                구직 중이에요
              </li>
              <div className="h-[1px] w-full bg-border-secondary" />
              <li
                className="cursor-pointer px-4 py-5"
                onClick={() => {
                  setStatus("일하고 있지만 좋은 제안은 검토해볼게요");
                  setIsBottomSheetOpen(false);
                }}
              >
                일하고 있지만 좋은 제안은 검토해볼게요
              </li>
              <div className="h-[1px] w-full bg-border-secondary" />
              <li
                className="cursor-pointer px-4 py-5"
                onClick={() => {
                  setStatus("당장은 구직 또는 이직 생각이 없어요");
                  setIsBottomSheetOpen(false);
                }}
              >
                당장은 구직 또는 이직 생각이 없어요
              </li>
              <div className="h-[1px] w-full bg-border-secondary" />
              <li
                className="cursor-pointer px-4 py-5"
                onClick={() => {
                  setStatus("특정 요일/시간만 일할 수 있어요");
                  setIsBottomSheetOpen(false);
                }}
              >
                특정 요일/시간만 일할 수 있어요
              </li>
            </ul>
          </div>
        </BottomSheetWrapper>
      )}
    </>
  );
};

export default JobSeekingStatusSection;
