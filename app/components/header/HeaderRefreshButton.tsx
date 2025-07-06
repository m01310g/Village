import RefreshIcon from "@/public/icons/icn_retry.svg";
import { useRegionFilterStore } from "@/store/useRegionFilterStore";

const HeaderRefreshButton = () => {
  const { resetSelectedDistricts } = useRegionFilterStore();
  return (
    <button
      className="flex h-[46px] w-[46px] items-center justify-center"
      onClick={resetSelectedDistricts}
    >
      <RefreshIcon color="#171717" width="24px" height="24px" />
    </button>
  );
};

export default HeaderRefreshButton;
