import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";
import { ErrorResponse } from "@/app/types/ErrorResponse";
import { useQuery } from "@tanstack/react-query";

interface Neighbor {
  id: number;
  profileImage: string;
  nickname: string;
  name: string;
  isNeighbor: number;
}

interface NeighborsList {
  receivedNumber: number;
  receiveds: Neighbor[];
  neighborNumber: number;
  neighbors: Neighbor[];
}

const getNeighbors = async (): Promise<NeighborsList> => {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-profile/myNeighbor`,
    {
      headers: {},
    },
  );

  if (!res.ok) {
    const error: ErrorResponse = await res.json();

    if (error.statusCode === 401) {
      throw new Error(`유효하지 않거나 인증이 만료된 토큰: ${error.message}`);
    } else if (error.statusCode === 403) {
      throw new Error(`유저 회원이 아닙니다: ${error.message}`);
    } else if (error.statusCode === 404) {
      throw new Error(`등록한 프로필이 없음: ${error.message}`);
    }
  }

  const result = await res.json();
  return result.data;
};

export const useNeighborsList = () => {
  return useQuery({
    queryKey: ["neighbors"],
    queryFn: getNeighbors,
  });
};
