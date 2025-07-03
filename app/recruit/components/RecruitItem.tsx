import { RecruitmentType } from "../hooks/useRecruitmentData";

interface RecruitItemProps {
  recruit: RecruitmentType;
}

const RecruitItem = ({ recruit }: RecruitItemProps) => {
  return (
    <>
      <div className="flex cursor-pointer flex-col gap-2 px-4 py-3">
        <h2 className="text-title-3 text-neutral-900">{recruit.centerName}</h2>
        <div className="flex flex-col gap-1">
          <span className="text-caption-3 text-text-tertiary">
            {recruit.location}
          </span>
          {recruit.workFormat.map((f, i) => (
            <span className="text-caption-3 text-text-tertiary" key={i}>
              {f}
            </span>
          ))}
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
        </div>
      </div>
      <div className="h-0.5 bg-border-primary" />
    </>
  );
};

export default RecruitItem;
