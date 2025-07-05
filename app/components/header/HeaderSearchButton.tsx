import Image from "next/image";
import { useState } from "react";
import HeaderSearchBar from "./HeaderSearchBar";

const HeaderSearchButton = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsSearchOpen(true)}>
        <Image
          src={"/icons/icn_search.svg"}
          alt="검색 버튼"
          width={24}
          height={24}
        />
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
