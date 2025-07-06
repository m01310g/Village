import { ErrorResponse } from "@/app/types/ErrorResponse";
import { useRegionFilterStore } from "@/store/useRegionFilterStore";
import { useQuery } from "@tanstack/react-query";
import { RecruitmentList } from "../types/recruitmentType";
import { useSearchKeywordStore } from "@/store/useSearchKeywordStore";

interface RecruitCountBody {
  selectedName?: string;
  selectedLocation?: Record<string, string[]>;
}

const fetchRecruitmentCount = async (
  body: RecruitCountBody,
): Promise<number> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-recruitment/search?page=1`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
  const data: RecruitmentList = result.data;
  const count = data.totalWebRecruitments;

  return count;
};

export const useRecruitmentCount = (keyword?: string) => {
  const { selectedDistricts } = useRegionFilterStore();

  const requestBody: RecruitCountBody = {};
  if (keyword) requestBody.selectedName = keyword;
  if (Object.keys(selectedDistricts).length > 0) {
    requestBody.selectedLocation = selectedDistricts;
  }

  const shouldFetch = !!keyword || Object.keys(selectedDistricts).length > 0;

  return useQuery({
    queryKey: ["recruitmentCount", keyword, selectedDistricts],
    queryFn: () => fetchRecruitmentCount(requestBody),
    enabled: shouldFetch,
  });
};
