import { useRouter } from "next/navigation";
import SearchIcon from "@/public/icons/icn_search.svg";
import RemoveIcon from "@/public/icons/close-2.svg";
import clsx from "clsx";

interface RecruitSearchBarProps {
  onClick?: (e?: React.MouseEvent<HTMLInputElement>) => void;
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
  const router = useRouter();
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleResetKeyword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setKeyword("");
    router.replace("/recruit");
  };

  return (
    <form
      className="flex w-full rounded-[10px] border border-border-tertiary px-3 py-2"
      onSubmit={onSubmit}
    >
      <SearchIcon width="24px" height="24px" color="#171717" />
      <input
        type="text"
        className={clsx(
          "text-body-3 w-full px-[10px] text-text-primary placeholder:text-neutral-300 focus:outline-none",
          onClick && "cursor-pointer",
        )}
        onClick={
          onClick
            ? (e: React.MouseEvent<HTMLInputElement>) => {
                e.preventDefault();
                e.stopPropagation();
                onClick(e);
              }
            : undefined
        }
        placeholder="센터명을 검색하세요."
        value={keyword}
        onChange={handleKeywordChange}
        readOnly={onClick !== undefined && keyword === ""}
      />
      {keyword.trim() !== "" && (
        <button
          type="button"
          className="cursor-pointer"
          onClick={handleResetKeyword}
        >
          <RemoveIcon color="#171717" width="24px" height="24px" />
        </button>
      )}
    </form>
  );
};

export default RecruitSearchBar;
