import SearchIcon from "@/public/icons/icn_search.svg";
import { useRouter } from "next/navigation";

const HeaderSearchButton = () => {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.push("/search-post")}>
      <SearchIcon width="24px" height="24px" color="#171717" />
    </button>
  );
};

export default HeaderSearchButton;
