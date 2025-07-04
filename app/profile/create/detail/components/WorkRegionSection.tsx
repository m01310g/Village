import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import ProfileLabel from "../../components/ProfileLabel";
import WorkRegionSelector from "./WorkRegionSelector";
import DistrictItem from "./DistrictItem";

interface WorkRegionSectionProps {
  showLabel?: boolean;
  selectedDistricts: { [key: string]: string[] };
  setSelectedDistricts: Dispatch<
    SetStateAction<{
      [key: string]: string[];
    }>
  >;
}

const WorkRegionSection = ({
  showLabel,
  selectedDistricts,
  setSelectedDistricts,
}: WorkRegionSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (!e.shiftKey) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section className="flex flex-col gap-3">
      {showLabel && (
        <div className="flex gap-3">
          <ProfileLabel label="근무 지역" bold required />
          <span className="text-body-3 text-neutral-600">중복 선택 가능</span>
        </div>
      )}
      <WorkRegionSelector
        selectedDistricts={selectedDistricts}
        setSelectedDistricts={setSelectedDistricts}
      />
      <div
        className="flex w-full gap-1 overflow-x-auto scrollbar-none"
        ref={scrollRef}
      >
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
