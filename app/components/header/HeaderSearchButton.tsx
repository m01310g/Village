import { useState } from "react";
import HeaderSearchBar from "./HeaderSearchBar";
import SearchIcon from "@/public/icons/icn_search.svg";

const HeaderSearchButton = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsSearchOpen(true)}>
        <SearchIcon width="24px" height="24px" color="#171717" />
      </button>
      {isSearchOpen && (
        <HeaderSearchBar
          onClose={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setIsSearchOpen(false);
          }}
        />
      )}
    </>
  );
};

export default HeaderSearchButton;
