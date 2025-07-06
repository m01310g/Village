import { RecruitmentType } from "../types/recruitmentType";

interface RecruitItemProps {
  recruit: RecruitmentType;
  onClick: () => void;
}

const RecruitItem = ({ recruit, onClick }: RecruitItemProps) => {
  return (
    <>
      <div
        className="flex cursor-pointer flex-col gap-2 px-4 py-3"
        onClick={onClick}
      >
        <h2 className="text-title-3 text-neutral-900">{recruit.centerName}</h2>
        <div className="flex flex-col gap-1">
          <span className="text-caption-3 text-text-tertiary">
            {recruit.location}
          </span>
          {!recruit.workType.includes("명시 안 됨") && (
            <span className="text-caption-3 text-text-tertiary">
              {recruit.workType.join(", ")}
            </span>
          )}
          {!recruit.workTime.includes("명시 안 됨") && (
            <div className="flex gap-1">
              {recruit.workTime.map((t, i) => (
                <span
                  key={i}
                  className="text-caption-3 rounded-[4px] bg-neutral-50 p-1 text-text-tertiary"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="h-0.5 bg-border-primary" />
    </>
  );
};

export default RecruitItem;
