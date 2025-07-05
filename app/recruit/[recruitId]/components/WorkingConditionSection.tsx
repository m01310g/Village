import RecruitmentDataItem from "./RecruitmentDataItem";

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
        <RecruitmentDataItem type="형태" content={workType} />
        <RecruitmentDataItem type="시간" content={workTime} />
        <RecruitmentDataItem type="주말당직" content={weekendDuty} />
      </div>
    </section>
  );
};

export default WorkingConditionSection;
