import clsx from "clsx";
import RecruitmentDataItem from "./RecruitmentDataItem";

interface ApplyRequirementSectionProps {
  gender: string;
  qualification: string[];
  preference: string[];
}

const ApplyRequirementSection = ({
  gender,
  qualification,
  preference,
}: ApplyRequirementSectionProps) => {
  return (
    <section className="flex flex-col gap-[14px]">
      <h3 className="text-title-3 text-text-primary">지원 조건</h3>
      <div className="flex flex-col gap-2">
        <RecruitmentDataItem type="성별" content={gender} />
        <RecruitmentDataItem type="지원자격" content={qualification} />
        <RecruitmentDataItem type="우대사항" content={preference} />
      </div>
    </section>
  );
};

export default ApplyRequirementSection;
