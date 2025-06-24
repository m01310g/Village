import { useAuthStore } from "@/store/useAuthStore";
import { ErrorResponse } from "@/app/types/ErrorResponse";
import { useQuery } from "@tanstack/react-query";
import { ProfileFormData } from "../types/profileFormData";

interface BoardProfile {
  id: number;
  profileImage: string;
  nickname: string;
  name: string;
}

export interface Board {
  id: number;
  type?: number;
  content: string;
  writtenAt: string;
  writtenBy: BoardProfile;
  commentNumber?: number;
  likeNumber?: number;
  images?: string[];
  isNeighbor?: number;
  isLiked?: number;
}

interface UserProfile extends ProfileFormData {
  id: number;
  type: string;
  neighbor: number;
  boards: Board[];
}

const getProfile = async (accessToken: string): Promise<UserProfile> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-profile/getMyWebProfile`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!res.ok) {
    const error: ErrorResponse = await res.json();

    if (error.statusCode === 401) {
      throw new Error(`유효하지 않거나 기간이 만료된 토큰: ${error.message}`);
    } else if (error.statusCode === 403) {
      throw new Error(`유저 회원이 아닙니다: ${error.message}`);
    } else if (error.statusCode === 404) {
      throw new Error(`등록한 프로필 없음: ${error.message}`);
    } else {
      throw new Error(`프로필 조회 중 오류 발생: ${error.message}`);
    }
  }

  const result = await res.json();
  const data: UserProfile = result.data;
  return data;
};

export const useUserProfile = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["userProfile"],
    queryFn: () => {
      if (!accessToken) throw new Error("No access token");
      return getProfile(accessToken);
    },
    enabled: !!accessToken,
  });
};
