import clsx from "clsx";
import CheckIcon from "@/public/icons/check.svg";

interface CheckboxProps {
  isChecked: boolean;
  onClick: () => void;
}

const Checkbox = ({ isChecked, onClick }: CheckboxProps) => {
  return (
    <div className="h-5 w-5 cursor-pointer p-0.5" onClick={onClick}>
      <div
        className={clsx(
          isChecked
            ? "rounded-[3px] border border-blue-600 bg-blue-600"
            : "rounded-[3px] border-[1.5px] border-border-secondary bg-background-primary",
        )}
      >
        <CheckIcon width="14px" height="14px" color="#ffffff" />
      </div>
    </div>
  );
};

export default Checkbox;
