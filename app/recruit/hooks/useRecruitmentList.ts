import { useQuery } from "@tanstack/react-query";
import { RecruitmentList } from "../types/recruitmentType";

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
