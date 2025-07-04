import clsx from "clsx";

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
        <div className="text-body-3 flex gap-8">
          <span
            className={clsx(
              "w-[60px]",
              gender === "명시 안 됨"
                ? "text-neutral-200"
                : "text-text-tertiary",
            )}
          >
            성별
          </span>
          <span
            className={clsx(
              gender === "명시 안 됨"
                ? "text-neutral-200"
                : "text-text-primary",
            )}
          >
            {gender === "명시 안 됨" ? "-" : gender}
          </span>
        </div>
        <div className="text-body-3 flex gap-8">
          <span
            className={clsx(
              "w-[60px]",
              qualification.includes("명시 안 됨")
                ? "text-neutral-200"
                : "text-text-tertiary",
            )}
          >
            지원자격
          </span>
          <span
            className={clsx(
              qualification.includes("명시 안 됨")
                ? "text-neutral-200"
                : "text-text-primary",
            )}
          >
            {qualification.includes("명시 안 됨")
              ? "-"
              : qualification.join(", ")}
          </span>
        </div>
        <div className="text-body-3 flex gap-8">
          <span
            className={clsx(
              "w-[60px]",
              preference.includes("명시 안 됨")
                ? "text-neutral-200"
                : "text-text-tertiary",
            )}
          >
            우대사항
          </span>
          <span
            className={clsx(
              preference.includes("명시 안 됨")
                ? "text-neutral-200"
                : "text-text-primary",
            )}
          >
            {preference.includes("명시 안 됨") ? "-" : preference.join(", ")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ApplyRequirementSection;
