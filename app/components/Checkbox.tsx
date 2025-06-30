import clsx from "clsx";
import CheckIcon from "@/public/icons/check.svg";

interface CheckboxProps {
  isChecked: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const Checkbox = ({ isChecked, onClick, disabled }: CheckboxProps) => {
  return (
    <div
      className={clsx(
        "h-5 w-5 p-0.5",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
      )}
      onClick={disabled ? undefined : onClick}
    >
      <div
        className={clsx(
          "rounded-[3px]",
          isChecked
            ? "border border-blue-600 bg-blue-600"
            : "border-[1.5px] border-border-secondary bg-background-primary",
        )}
      >
        <CheckIcon width="14px" height="14px" color="#ffffff" />
      </div>
    </div>
  );
};

export default Checkbox;
