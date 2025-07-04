import clsx from "clsx";
import RecruitmentDataItem from "./RecruitmentDataItem";

interface WorkingAdressSectionProps {
  address: string;
}

const WorkingAdressSection = ({ address }: WorkingAdressSectionProps) => {
  return (
    <section className="flex flex-col gap-[14px]">
      <h3 className="text-title-3 text-text-primary">근무 지역</h3>
      <div className="flex flex-col gap-2">
        <RecruitmentDataItem type="위치" content={address} />
        <div className="h-[200px] w-full overflow-hidden rounded-[8px]">
          {/* 카카오맵 연결 필요 */}
        </div>
      </div>
    </section>
  );
};

export default WorkingAdressSection;
