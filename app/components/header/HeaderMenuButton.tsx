import MenuIcon from "@/public/icons/icn_dot-horizontal.svg";

interface HeaderMenuButtonProps {
  onClick: () => void;
}

const HeaderMenuButton = ({ onClick }: HeaderMenuButtonProps) => {
  return (
    <button type="button" onClick={onClick}>
      <MenuIcon width="24px" height="24px" color="#171717" />
    </button>
  );
};

export default HeaderMenuButton;
