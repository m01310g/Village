import CalendarIcon from "@/public/icons/icn_calendar.svg";

interface CenterNameSectionProps {
  centerName: string;
  createdAt: string;
}

const CenterNameSection = ({
  centerName,
  createdAt,
}: CenterNameSectionProps) => {
  return (
    <section className="flex flex-col gap-[6px] px-4 py-[18px] text-text-primary">
      <h1 className="text-title-1">{centerName}</h1>
      <div className="flex items-center gap-[6px]">
        <CalendarIcon width="20px" height="20px" color="#171717" />
        <span className="text-body-3 text-neutral-400">{createdAt}</span>
      </div>
    </section>
  );
};

export default CenterNameSection;
