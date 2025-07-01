import FilterIcon from "@/public/icons/icn_filter.svg";

interface RegionFilterSettingBarProps {
  selectedDistricts: string[];
  setSelectedDistricts: React.Dispatch<React.SetStateAction<string[]>>;
}

const RegionFilterSettingBar = ({
  selectedDistricts,
  setSelectedDistricts,
}: RegionFilterSettingBarProps) => {
  return (
    <div className="flex justify-between bg-background-brandSecondary px-4 py-3">
      <span className="text-body-2 text-text-onsecondary">
        지역 조건을 설정해보세요.
      </span>
      <button>
        <FilterIcon color="#737373" width="24px" height="24px" />
      </button>
    </div>
  );
};

export default RegionFilterSettingBar;
