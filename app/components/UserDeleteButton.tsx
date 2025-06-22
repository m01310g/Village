import { useAuthStore } from "@/store/useAuthStore";
import { ErrorResponse } from "@/app/types/ErrorResponse";
import { useRouter } from "next/navigation";

interface UserDeleteResponse {
  message: string;
  statusCode: number;
}

const UserDeleteButton = () => {
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const accessToken = useAuthStore((state) => state.accessToken);
  const router = useRouter();

  const handleUserDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-auth/delete`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        },
      );

      if (res.status === 200) {
        const data: UserDeleteResponse = await res.json();
        console.log(data.message);
        router.replace("/");
      } else if (res.status === 401) {
        const error: ErrorResponse = await res.json();
        console.error("권한 오류:", error.message);
        alert("로그인 상태가 만료되었습니다. 다시 로그인해주세요.");
      } else {
        const error = await res.json();
        console.error("알 수 없는 오류:", error.message || res.statusText);
      }
    } catch (err: any) {
      console.error(
        err instanceof Error
          ? err.message
          : "회원 탈퇴 중 오류가 발생했습니다.",
      );
    }
  };
  return <button onClick={handleUserDelete}>탈퇴하기</button>;
};

export default UserDeleteButton;
