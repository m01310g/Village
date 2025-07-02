interface SalaryConditionSectionProps {
  salary: string[];
  maxClassFee: string;
}

const SalaryConditionSection = ({
  salary,
  maxClassFee,
}: SalaryConditionSectionProps) => {
  return (
    <section className="flex flex-col gap-[14px]">
      <h3 className="text-title-3 text-text-primary">급여 조건</h3>
      <div className="flex flex-col gap-2">
        <div className="text-body-3 flex gap-8">
          <span className="w-[60px] text-text-tertiary">급여조건</span>
          <span className="text-text-primary">{salary.join(", ")}</span>
        </div>
        <div className="text-body-3 flex gap-8">
          <span className="w-[60px] text-text-tertiary">최대수업료</span>
          <span className="text-text-info">{maxClassFee}</span>
        </div>
      </div>
    </section>
  );
};

export default SalaryConditionSection;
