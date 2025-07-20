import clsx from "clsx";
import RecruitmentDataItem from "./RecruitmentDataItem";

interface SalaryConditionSectionProps {
  salary: string[];
  maxClassFee: number;
}

const SalaryConditionSection = ({
  salary,
  maxClassFee,
}: SalaryConditionSectionProps) => {
  return (
    <section className="flex flex-col gap-[0.875rem]">
      <h3 className="text-title-3 text-text-primary">급여 조건</h3>
      <div className="flex flex-col gap-2">
        <RecruitmentDataItem type="급여조건" content={salary} />
        <div className="text-body-3 flex gap-8">
          <span
            className={clsx(
              "w-[60px]",
              maxClassFee === -2 ? "text-neutral-200" : "text-text-tertiary",
            )}
          >
            최대수업료
          </span>
          <span
            className={clsx(
              maxClassFee === -1
                ? "text-text-primary"
                : maxClassFee === -2
                  ? "text-neutral-200"
                  : "text-text-info",
            )}
          >
            {maxClassFee === -1
              ? "채용 공고 참고"
              : maxClassFee === -2
                ? "-"
                : `${maxClassFee}%`}
          </span>
        </div>
      </div>
    </section>
  );
};

export default SalaryConditionSection;
