import SalaryConditionSection from "./SalaryConditionSection";

const RecruitmentInfo = () => {
  const salary = ["수업료", "인센티브(커미션)"];
  const maxClassFee = "45%";

  return (
    <div className="flex flex-col gap-[14px] px-4 py-5">
      <SalaryConditionSection salary={salary} maxClassFee={maxClassFee} />
      <div className="h-[1px] bg-border-primary" />
    </div>
  );
};

export default RecruitmentInfo;
