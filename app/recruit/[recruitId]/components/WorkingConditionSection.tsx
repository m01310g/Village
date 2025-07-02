import clsx from "clsx";

interface WorkingConditionSectionProps {
  workType: string[];
  workTime: string[];
  weekendDuty: number;
}

const WorkingConditionSection = ({
  workType,
  workTime,
  weekendDuty,
}: WorkingConditionSectionProps) => {
  return (
    <section className="flex flex-col gap-[14px]">
      <h3 className="text-title-3 text-text-primary">근무 조건</h3>
      <div className="flex flex-col gap-2">
        <div className="text-body-3 flex gap-8">
          <span className="w-[60px] text-text-tertiary">형태</span>
          <span className="text-text-primary">{workType.join(", ")}</span>
        </div>
        <div className="text-body-3 flex gap-8">
          <span
            className={clsx(
              "w-[60px]",
              !!workTime ? "text-text-tertiary" : "text-neutral-200",
            )}
          >
            시간
          </span>
          <span
            className={clsx(
              !!workTime ? "text-text-primary" : "text-neutral-200",
            )}
          >
            {workTime ?? "-"}
          </span>
        </div>
        <div className="text-body-3 flex gap-8">
          <span
            className={clsx(
              "w-[60px]",
              !!weekendDuty ? "text-text-tertiary" : "text-neutral-200",
            )}
          >
            주말당직
          </span>
          <span
            className={clsx(
              "w-[60px]",
              weekendDuty !== 0 ? "text-text-tertiary" : "text-neutral-200",
            )}
          >
            {weekendDuty === 0
              ? "-"
              : weekendDuty === 1
                ? "있음"
                : weekendDuty === 2
                  ? "없음"
                  : "채용 공고 참고"}
          </span>
        </div>
      </div>
    </section>
  );
};

export default WorkingConditionSection;
