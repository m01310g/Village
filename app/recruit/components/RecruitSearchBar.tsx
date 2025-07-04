import SearchIcon from "@/public/icons/icn_search.svg";
import clsx from "clsx";

interface RecruitSearchBarProps {
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  keyword: string;
  setKeyword: (value: string) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const RecruitSearchBar = ({
  keyword,
  setKeyword,
  onClick,
  onSubmit,
}: RecruitSearchBarProps) => {
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <form
      className="flex w-full rounded-[10px] border border-border-tertiary px-3 py-2"
      onClick={
        onClick
          ? (e: React.MouseEvent<HTMLFormElement>) => {
              e.preventDefault();
              onClick();
            }
          : undefined
      }
      onSubmit={onSubmit}
    >
      <SearchIcon width="24px" height="24px" color="#171717" />
      <input
        type="text"
        className={clsx(
          "text-body-3 w-full px-[10px] text-text-primary placeholder:text-neutral-300 focus:outline-none",
          onClick && "cursor-pointer",
        )}
        placeholder="센터명을 검색하세요."
        value={keyword}
        onChange={handleKeywordChange}
        readOnly={!!onClick}
      />
    </form>
  );
};

export default RecruitSearchBar;
