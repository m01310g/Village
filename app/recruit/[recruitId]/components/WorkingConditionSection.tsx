import clsx from "clsx";

interface WorkingConditionSectionProps {
  workType: string[];
  workTime: string[];
  weekendDuty: string;
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
          <span
            className={clsx(
              "w-[60px] shrink-0",
              workType.includes("명시 안 됨")
                ? "text-neutral-200"
                : "text-text-tertiary",
            )}
          >
            형태
          </span>
          <span
            className={clsx(
              workType.includes("명시 안 됨")
                ? "text-neutral-200"
                : "text-text-primary",
            )}
          >
            {workType.includes("명시 안 됨") ? "-" : workType.join(", ")}
          </span>
        </div>
        <div className="text-body-3 flex gap-8">
          <span
            className={clsx(
              "w-[60px] shrink-0",
              workTime.includes("명시 안 됨")
                ? "text-neutral-200"
                : "text-text-tertiary",
            )}
          >
            시간
          </span>
          <span
            className={clsx(
              workTime.includes("명시 안 됨")
                ? "text-neutral-200"
                : "text-text-primary",
            )}
          >
            {workTime.includes("명시 안 됨") ? "-" : workTime.join(", ")}
          </span>
        </div>
        <div className="text-body-3 flex gap-8">
          <span
            className={clsx(
              "w-[60px] shrink-0",
              weekendDuty === "명시 안 됨"
                ? "text-neutral-200"
                : "text-text-tertiary",
            )}
          >
            주말당직
          </span>
          <span
            className={clsx(
              "w-[60px] shrink-0",
              weekendDuty === "명시 안 됨"
                ? "text-neutral-200"
                : "text-text-primary",
            )}
          >
            {weekendDuty === "명시 안 됨" ? "-" : weekendDuty}
          </span>
        </div>
      </div>
    </section>
  );
};

export default WorkingConditionSection;
