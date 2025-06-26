import BackIcon from "@/public/icons/chevron-left.svg";
import SearchIcon from "@/public/icons/icn_search.svg";

interface HeaderSearchBarProps {
  onClose: () => void;
}

const HeaderSearchBar = ({ onClose }: HeaderSearchBarProps) => {
  return (
    <div className="fixed inset-0 z-50 m-auto max-w-[375px] bg-white px-1">
      <div className="flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex h-[46px] w-[46px] items-center justify-center"
        >
          <BackIcon width="24px" height="24px" color="#171717" />
        </button>
        <div className="flex flex-1 gap-1 rounded-[999px] bg-background-secondary px-3 py-2">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="text-body-3 w-full bg-transparent text-text-primary placeholder:text-text-tertiary focus:outline-none"
          />
          <button>
            <SearchIcon width="24px" height="24px" color="#171717" />
          </button>
        </div>
        <div className="h-[46px] w-[46px]" />
      </div>
    </div>
  );
};

export default HeaderSearchBar;
