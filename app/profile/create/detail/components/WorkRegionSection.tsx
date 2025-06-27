import { useState } from "react";
import ProfileLabel from "../../components/ProfileLabel";
import WorkRegionSelector from "./WorkRegionSelector";
import DistrictItem from "./DistrictItem";

const WorkRegionSection = () => {
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);

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
        {selectedDistricts.map((district, i) => (
          <DistrictItem
            key={i}
            district={district}
            onRemove={() =>
              setSelectedDistricts((prev) => prev.filter((d) => d !== district))
            }
          />
        ))}
      </div>
    </section>
  );
};

export default WorkRegionSection;
