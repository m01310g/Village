import clsx from "clsx";
import CheckIcon from "@/public/icons/check.svg";

interface CheckboxProps {
  isChecked: boolean;
}

const Checkbox = ({ isChecked }: CheckboxProps) => {
  return (
    <div className="h-5 w-5 p-0.5">
      <div
        className={clsx(
          isChecked
            ? "border border-blue-600 bg-blue-600"
            : "border border-border-secondary bg-background-primary",
        )}
      >
        <CheckIcon width="14px" height="14px" color="#ffffff" />
      </div>
    </div>
  );
};

export default Checkbox;
