import { ErrorResponse } from "@/app/types/ErrorResponse";
import { RecruitmentList } from "./useRecruitmentList";
import { useRegionFilterStore } from "@/store/useRegionFilterStore";
import { useQuery } from "@tanstack/react-query";

const fetchRecruitsByFilter = async (
  body: Record<string, string>,
  page: number,
): Promise<RecruitmentList> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-recruitment/search?page=${page}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) {
    const error: ErrorResponse = await res.json();
    if (error.statusCode === 400) {
      throw new Error(`데이터 형식 오류: ${error.message}`);
    }
  }

  const result = await res.json();
  const data = result.data;

  return data;
};

export const useRecruitmentFilter = (
  selectedName?: string,
  page: number = 1,
) => {
  const { selectedDistricts } = useRegionFilterStore();

  const requestBody: Record<string, any> = {};
  if (selectedName) requestBody.selectedName = selectedName;
  if (Object.keys(selectedDistricts).length > 0) {
    requestBody.selectedLocation = selectedDistricts;
  }

  return useQuery({
    queryKey: ["recruitmentList", selectedName, selectedDistricts, page],
    queryFn: () => fetchRecruitsByFilter(requestBody, page),
    enabled: Object.keys(requestBody).length > 0,
  });
};
