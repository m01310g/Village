import BackIcon from "@/public/icons/chevron-left.svg";
import SearchIcon from "@/public/icons/icn_search.svg";
import RemoveIcon from "@/public/icons/close-2.svg";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SearchPostsHeaderProps {
  keyword: string;
}

const SearchPostsHeader = ({ keyword }: SearchPostsHeaderProps) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(keyword);

  useEffect(() => {
    setInputValue(keyword);
  }, [keyword]);

  const handleBack = () => {
    if (document.referrer === "" || window.history.length <= 1) {
      router.replace("/");
    } else {
      router.back();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const params = new URLSearchParams();
    params.set("keyword", inputValue.trim());
    params.set("page", "1");

    router.push(`/search-post?${params.toString()}`);
  };

  const handleClear = () => {
    setInputValue("");
    const params = new URLSearchParams(window.location.search);
    params.delete("keyword");
    params.delete("page");

    router.replace(`/search-post`);
  };

  return (
    <header className="flex h-[46px] items-center justify-center bg-background-primary px-4">
      <button className="h-[46px] w-[46px]" onClick={handleBack}>
        <BackIcon color="#171717" height="24px" width="24px" />
      </button>
      <form
        className="flex w-full justify-between rounded-[999px] bg-background-secondary px-3 py-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="text-body-3 w-full bg-transparent text-text-primary placeholder:text-text-tertiary focus:outline-none"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="[채용]을 검색해보세요"
        />
        {inputValue.length > 0 ? (
          <button
            type="button"
            className="h-6 w-6 shrink-0"
            onClick={handleClear}
          >
            <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-neutral-400">
              <RemoveIcon height="16px" width="16px" color="#ffffff" />
            </div>
          </button>
        ) : (
          <button type="button" className="flex items-center justify-center">
            <SearchIcon color="#171717" width="24px" height="24px" />
          </button>
        )}
      </form>
    </header>
  );
};

export default SearchPostsHeader;
