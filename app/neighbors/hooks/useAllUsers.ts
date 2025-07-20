import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";
import { ErrorResponse } from "@/app/types/ErrorResponse";
import { NeighborType } from "../types/neighborType";
import { useQuery } from "@tanstack/react-query";
import { useIsLoggedIn } from "@/app/hooks/useIsLoggedIn";

const fetchAllUsers = async (isLoggedIn: boolean): Promise<NeighborType[]> => {
  const res = await (isLoggedIn ? fetchWithAuth : fetch)(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-profile/getAllWebProfile`,
    {
      method: "GET",
    },
  );

  if (!res.ok) {
    const error: ErrorResponse = await res.json();
    if (error.statusCode)
      throw new Error(`유효하지 않거나 기간이 만료된 토큰: ${error.message}`);
  }

  const result = await res.json();
  const data: NeighborType[] = result.data;

  return data;
};

export const useAllUsers = () => {
  const { isLoggedIn } = useIsLoggedIn();

  return useQuery({
    queryKey: ["users", isLoggedIn],
    queryFn: () => fetchAllUsers(isLoggedIn),
  });
};
