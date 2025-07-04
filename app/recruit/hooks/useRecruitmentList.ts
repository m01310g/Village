import { useQuery } from "@tanstack/react-query";

export interface RecruitmentType {
  id: number;
  city: string;
  centerName: string;
  location: string;
  workType: string[];
  workTime: string[];
}

export interface RecruitmentList {
  webRecruitmentList: RecruitmentType[];
  totalWebRecruitments: number;
  totalPages: number;
  currentPage: number;
}

const getAllWebRecruitment = async (page: number): Promise<RecruitmentList> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-recruitment/getAll?page=${page}`,
  );

  const result = await res.json();
  const data = result.data;

  return data;
};

export const useRecruitmentList = (page: number) => {
  return useQuery({
    queryKey: ["recruitmentList", page],
    queryFn: () => getAllWebRecruitment(page),
  });
};
