import clsx from "clsx";
import SendIcon from "@/public/icons/icn_send-01.svg";

interface CommentCreateButtonProps {
  isActive?: boolean;
  onClick: () => void;
}

const CommentCreateButton = ({
  isActive = false,
  onClick,
}: CommentCreateButtonProps) => {
  return (
    <button
      className={clsx(
        isActive ? "bg-background-brand" : "bg-background-tertiary",
        "flex h-[42px] min-h-[42px] w-[42px] min-w-[42px] items-center justify-center rounded-[999px]",
      )}
      onClick={onClick}
    >
      <SendIcon
        width="24px"
        height="24px"
        color={isActive ? "#ffffff" : "#d4d4d4"}
      />
    </button>
  );
};

export default CommentCreateButton;
