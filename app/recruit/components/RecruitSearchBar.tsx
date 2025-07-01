import SearchIcon from "@/public/icons/icn_search.svg";

interface RecruitSearchBarProps {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

const RecruitSearchBar = ({ keyword, setKeyword }: RecruitSearchBarProps) => {
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <form className="flex w-full rounded-[10px] border border-border-tertiary px-3 py-2">
      <SearchIcon width="24px" height="24px" color="#171717" />
      <input
        type="text"
        className="text-body-3 w-full px-[10px] text-text-primary placeholder:text-neutral-300 focus:outline-none"
        placeholder="센터명을 검색하세요."
        value={keyword}
        onChange={handleKeywordChange}
      />
    </form>
  );
};

export default RecruitSearchBar;
