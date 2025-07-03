import clsx from "clsx";

interface ApplyRequirementSectionProps {
  gender: number;
  qualification: string[];
  preference: string[];
}

const ApplyRequirementSection = ({
  gender,
  qualification,
  preference,
}: ApplyRequirementSectionProps) => {
  const genderMap: Record<number, string> = {
    0: "-",
    1: "성별 무관",
    2: "남성",
    3: "여성",
  };
  return (
    <section className="flex flex-col gap-[14px]">
      <h3 className="text-title-3 text-text-primary">지원 조건</h3>
      <div className="flex flex-col gap-2">
        <div className="text-body-3 flex gap-8">
          <span className="w-[60px] text-text-tertiary">성별</span>
          <span
            className={clsx(
              gender === 0 ? "text-text-neutral" : "text-text-primary",
            )}
          >
            {genderMap[gender]}
          </span>
        </div>
        <div className="text-body-3 flex gap-8">
          <span className="w-[60px] text-text-tertiary">지원자격</span>
          <span className="text-text-primary">{qualification.join(", ")}</span>
        </div>
      </div>
      <div className="text-body-3 flex gap-8">
        <span className="w-[60px] text-text-tertiary">우대사항</span>
        <span className="text-text-primary">{preference}</span>
      </div>
    </section>
  );
};

export default ApplyRequirementSection;
