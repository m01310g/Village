import clsx from "clsx";

interface HeaderCreateButtonProps {
  showCreateButtonProps: { className: string; disabled: boolean };
  onClick?: () => void;
  label: string;
}

const HeaderCreateButton = ({
  showCreateButtonProps,
  onClick,
  label,
}: HeaderCreateButtonProps) => {
  return (
    <button
      className={clsx("text-body-2 h-12 w-12", showCreateButtonProps.className)}
      disabled={showCreateButtonProps.disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default HeaderCreateButton;
