import { Dispatch, SetStateAction, useState } from "react";
import ProfileLabel from "../../components/ProfileLabel";
import WorkRegionSelector from "./WorkRegionSelector";
import DistrictItem from "./DistrictItem";

interface WorkRegionSectionProps {
  selectedDistricts: { [key: string]: string[] };
  setSelectedDistricts: Dispatch<
    SetStateAction<{
      [key: string]: string[];
    }>
  >;
}

const WorkRegionSection = ({
  selectedDistricts,
  setSelectedDistricts,
}: WorkRegionSectionProps) => {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex gap-3">
        <ProfileLabel label="근무 지역" bold required />
        <span className="text-body-3 text-neutral-600">중복 선택 가능</span>
      </div>
      <WorkRegionSelector
        selectedDistricts={selectedDistricts}
        setSelectedDistricts={setSelectedDistricts}
      />
      <div className="flex w-full gap-1 overflow-x-auto">
        {Object.entries(selectedDistricts).flatMap(([sido, districts]) =>
          districts.map((district) => (
            <DistrictItem
              key={`${sido}-${district}`}
              district={district}
              onRemove={() =>
                setSelectedDistricts((prev) => {
                  const updated = { ...prev };
                  updated[sido] = updated[sido].filter((d) => d !== district);
                  if (updated[sido].length === 0) {
                    delete updated[sido];
                  }
                  return updated;
                })
              }
            />
          )),
        )}
      </div>
    </section>
  );
};

export default WorkRegionSection;
