import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import CheckIcon from "@/public/icons/check.svg";
import { regions } from "@/constants/regions";

interface WorkRegionSelectorProps {
  selectedDistricts: string[];
  setSelectedDistricts: Dispatch<SetStateAction<string[]>>;
}

const WorkRegionSelector = ({
  selectedDistricts,
  setSelectedDistricts,
}: WorkRegionSelectorProps) => {
  const [selectedSido, setSelectedSido] = useState("서울");

  const toggleDistrict = (name: string) => {
    setSelectedDistricts((prev) =>
      prev.includes(name) ? prev.filter((d) => d !== name) : [...prev, name],
    );
  };

  const selectedRegion = regions.find((r) => r.name === selectedSido);
  return (
    <div>
      <div className="text-body-2 flex w-full rounded-t-[8px] border-x border-t border-border-tertiary bg-neutral-50 text-neutral-400">
        <div className="max-h-[246px] w-[100px] overflow-y-auto border-r border-border-tertiary px-[10px] py-2 text-center">
          시·도
        </div>
        <div className="flex-1 px-[10px] py-2 text-center">시·군·구</div>
      </div>
      <div className="flex rounded-b-[8px] border-x border-b border-border-tertiary">
        <div className="h-[246px] w-[100px] overflow-y-auto border-r">
          {regions.map((region) => (
            <div
              key={region.name}
              className={clsx(
                "text-body-2 cursor-pointer p-[10px]",
                selectedSido === region.name
                  ? "bg-background-brand text-white"
                  : "text-neutral-400",
              )}
              onClick={() => setSelectedSido(region.name)}
            >
              {region.name}
            </div>
          ))}
        </div>

        <div className="h-[246px] flex-1 overflow-y-auto">
          {selectedRegion?.districts.map((district) => (
            <div
              key={district}
              className={clsx(
                "text-body-2 flex cursor-pointer items-center justify-between p-[10px]",
                selectedDistricts.includes(district)
                  ? "text-text-brand"
                  : "text-neutral-400",
              )}
              onClick={() => toggleDistrict(district)}
            >
              <span>{district}</span>
              {selectedDistricts.includes(district) && (
                <CheckIcon width="20px" height="20px" color="#00a6f4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkRegionSelector;
