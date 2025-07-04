import { ErrorResponse } from "@/app/types/ErrorResponse";
import { RecruitmentById } from "../types/recruitmentType";
import { useQuery } from "@tanstack/react-query";

const fetchRecruitmentById = async (id: number): Promise<RecruitmentById> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-recruitment/getOne`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    },
  );

  if (!res.ok) {
    const error: ErrorResponse = await res.json();
    if (error.statusCode === 400) {
      throw new Error(`데이터 형식 오류: ${error.message}`);
    } else if (error.statusCode === 404) {
      throw new Error(`해당 id의 공고를 찾을 수 없음: ${error.message}`);
    }
  }

  const result = await res.json();
  const data: RecruitmentById = result.data;

  return data;
};

export const useRecruitmentById = (id: number) => {
  return useQuery({
    queryKey: ["recruitment", id],
    queryFn: () => fetchRecruitmentById(id),
  });
};
