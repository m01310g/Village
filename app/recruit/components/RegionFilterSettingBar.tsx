import FilterIcon from "@/public/icons/icn_filter.svg";
import { useRouter } from "next/navigation";

const RegionFilterSettingBar = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between bg-background-brandSecondary px-4 py-3">
      <span className="text-body-2 text-text-onsecondary">
        지역 조건을 설정해보세요.
      </span>
      <button onClick={() => router.push("/recruit/select-region")}>
        <FilterIcon color="#737373" width="24px" height="24px" />
      </button>
    </div>
  );
};

export default RegionFilterSettingBar;
