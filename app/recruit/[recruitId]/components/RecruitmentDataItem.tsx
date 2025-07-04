import clsx from "clsx";

interface RecruitmentDataItemProps {
  type: string;
  content: string | string[];
}

const RecruitmentDataItem = ({ type, content }: RecruitmentDataItemProps) => {
  return (
    <div className="text-body-3 flex gap-8">
      <span
        className={clsx(
          "w-[60px] shrink-0",
          content.includes("명시 안 됨")
            ? "text-neutral-200"
            : "text-text-tertiary",
        )}
      >
        {type}
      </span>
      <span
        className={clsx(
          content.includes("명시 안 됨")
            ? "text-neutral-200"
            : "text-text-primary",
        )}
      >
        {content.includes("명시 안 됨")
          ? "-"
          : Array.isArray(content)
            ? content.join(", ")
            : content}
      </span>
    </div>
  );
};

export default RecruitmentDataItem;
