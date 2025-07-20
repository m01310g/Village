import clsx from "clsx";

interface FilteringButtonProps {
  content: string;
  isActive: boolean;
  onClick: () => void;
}

const FilteringButton = ({
  content,
  isActive,
  onClick,
}: FilteringButtonProps) => {
  return (
    <button
      className={clsx(
        "min-w-12 rounded-[99px] px-2 py-[0.375rem]",
        isActive
          ? "text-body-3 bg-neutral-700 text-text-onprimary"
          : "text-body-3 bg-background-secondary text-text-primary",
      )}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default FilteringButton;
