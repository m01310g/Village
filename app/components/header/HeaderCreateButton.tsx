import clsx from "clsx";

interface HeaderCreateButtonProps {
  showCreateButtonProps: { className: string; disabled: boolean };
  onClick?: () => void;
}

const HeaderCreateButton = ({
  showCreateButtonProps,
  onClick,
}: HeaderCreateButtonProps) => {
  return (
    <button
      className={clsx("text-body-2 h-12 w-12", showCreateButtonProps.className)}
      disabled={showCreateButtonProps.disabled}
      onClick={onClick}
    >
      게시
    </button>
  );
};

export default HeaderCreateButton;
