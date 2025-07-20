import { useIsLoggedIn } from "@/app/hooks/useIsLoggedIn";
import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";
import { NeighborType } from "@/app/neighbors/types/neighborType";
import { ErrorResponse } from "@/app/types/ErrorResponse";
import { useQuery } from "@tanstack/react-query";

interface NeighborById {
  neighborNumber: number;
  neighbors: NeighborType[];
}

const getNeighborById = async (
  userId: number,
  isLoggedIn: boolean,
): Promise<NeighborById> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-profile/getNeighbor`;
  const res = await (isLoggedIn ? fetchWithAuth : fetch)(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: userId }),
  });

  if (!res.ok) {
    const error: ErrorResponse = await res.json();

    if (error.statusCode === 400) {
      throw new Error(`데이터 형식 오류: ${error.message}`);
    } else if (error.statusCode === 401) {
      throw new Error(`유효하지 않거나 기간이 만료된 토큰: ${error.message}`);
    } else if (error.statusCode === 404) {
      throw new Error(`해당 ID의 사용자가 없음: ${error.message}`);
    }
  }

  const result = await res.json();
  const data = result.data;

  return data;
};

export const useNeighborsById = (userId: number) => {
  const { isLoggedIn } = useIsLoggedIn();

  return useQuery<NeighborById>({
    queryKey: ["neighbors", userId],
    queryFn: () => getNeighborById(userId, isLoggedIn),
    enabled: !!userId,
  });
};
