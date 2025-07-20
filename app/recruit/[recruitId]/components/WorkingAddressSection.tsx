import KakaoMap from "./KakaoMap";
import RecruitmentDataItem from "./RecruitmentDataItem";

interface WorkingAdressSectionProps {
  address: string;
  centerName: string;
}

const WorkingAdressSection = ({
  address,
  centerName,
}: WorkingAdressSectionProps) => {
  return (
    <section className="flex flex-col gap-[0.875rem]">
      <h3 className="text-title-3 text-text-primary">근무 지역</h3>
      <div className="flex flex-col gap-2">
        <RecruitmentDataItem type="위치" content={address} />
        <div className="h-[200px] w-full overflow-hidden rounded-[8px]">
          <KakaoMap address={address} centerName={centerName} />
        </div>
      </div>
    </section>
  );
};

export default WorkingAdressSection;
