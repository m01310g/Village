import { RecruitmentById } from "../../types/recruitmentType";
import ApplyRequirementSection from "./ApplyRequirementSection";
import SalaryConditionSection from "./SalaryConditionSection";
import WorkingAddressSection from "./WorkingAddressSection";
import WorkingConditionSection from "./WorkingConditionSection";

const RecruitmentInfo = (recruitment: RecruitmentById) => {
  return (
    <div className="flex flex-col gap-[14px] px-4 py-5">
      <SalaryConditionSection
        salary={recruitment.salary}
        maxClassFee={recruitment.maxClassFee}
      />
      <div className="h-[1px] bg-border-primary" />
      <WorkingConditionSection
        workType={recruitment.workType}
        workTime={recruitment.workTime}
        weekendDuty={recruitment.weekendDuty}
      />
      <div className="h-[1px] bg-border-primary" />
      <WorkingAddressSection address={recruitment.address} />
      <div className="h-[1px] bg-border-primary" />
      <ApplyRequirementSection
        gender={recruitment.gender}
        qualification={recruitment.qualification}
        preference={recruitment.preference}
      />
    </div>
  );
};

export default RecruitmentInfo;
