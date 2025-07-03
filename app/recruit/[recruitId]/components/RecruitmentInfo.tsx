import SalaryConditionSection from "./SalaryConditionSection";
import WorkingAddressSection from "./WorkingAddressSection";
import WorkingConditionSection from "./WorkingConditionSection";

const RecruitmentInfo = () => {
  const salary = ["수업료", "인센티브(커미션)"];
  const maxClassFee = "45%";
  const workType = ["정규직", "파트타임"];
  const workTime = [""];
  const weekendDuty = 0;
  const address = "경기 성남시 분당구 서현동 00휘트니스";

  return (
    <div className="flex flex-col gap-[14px] px-4 py-5">
      <SalaryConditionSection salary={salary} maxClassFee={maxClassFee} />
      <div className="h-[1px] bg-border-primary" />
      <WorkingConditionSection
        workType={workType}
        workTime={workTime}
        weekendDuty={weekendDuty}
      />
      <div className="h-[1px] bg-border-primary" />
      <WorkingAddressSection address={address} />
      <div className="h-[1px] bg-border-primary" />
    </div>
  );
};

export default RecruitmentInfo;
