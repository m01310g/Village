import DistrictItem from "@/app/(main)/create/detail/components/DistrictItem";
import { useRegionFilterStore } from "@/store/useRegionFilterStore";

interface SelectedRegionsProps {
  sido: string;
  district: string;
}

const SelectedRegions = ({ sido, district }: SelectedRegionsProps) => {
  const setSelectedDistricts = useRegionFilterStore(
    (state) => state.setSelectedDistricts,
  );

  return (
    <DistrictItem
      key={`${sido}-${district}`}
      district={district}
      sido={sido}
      onRemove={(target) =>
        setSelectedDistricts((prev) => {
          const [targetSido, targetDistrict] = target.split(":");

          const updated =
            prev[targetSido]?.filter((d) => d !== targetDistrict) || [];

          if (updated.length === 0) {
            const rest = { ...prev };
            delete rest[targetSido];
            return rest;
          }

          return {
            ...prev,
            [targetSido]: updated,
          };
        })
      }
    />
  );
};

export default SelectedRegions;
