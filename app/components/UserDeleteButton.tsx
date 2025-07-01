import { useAuthStore } from "@/store/useAuthStore";
import { ErrorResponse } from "@/app/types/ErrorResponse";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "../lib/api/fetchWithAuth";
import { useState } from "react";
import Button from "./Button";
import ModalWrapper from "./modal/ModalWrapper";

interface UserDeleteResponse {
  message: string;
  statusCode: number;
}

const UserDeleteButton = () => {
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserDelete = async () => {
    try {
      const res = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-auth/delete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        },
      );

      if (!res.ok) {
        const error: ErrorResponse = await res.json();

        if (error.statusCode === 401) {
          console.error("권한 오류:", error.message);
          alert("로그인 상태가 만료되었습니다. 다시 로그인해주세요.");
        } else {
          const error = await res.json();
          console.error("알 수 없는 오류:", error.message || res.statusText);
        }
      }

      const data: UserDeleteResponse = await res.json();
      useAuthStore.getState().resetAuth();
      localStorage.removeItem("user-profile-form");
      router.replace("/");
    } catch (err) {
      console.error(
        err instanceof Error
          ? err.message
          : "회원 탈퇴 중 오류가 발생했습니다.",
      );
    }
  };
  return (
    <>
      <li
        className="cursor-pointer px-4 py-5 text-text-tertiary"
        onClick={() => setIsModalOpen(true)}
      >
        회원탈퇴
      </li>
      {isModalOpen && (
        <ModalWrapper onClose={() => setIsModalOpen(false)}>
          <h3 className="text-title-3 text-text-primary">
            정말 탈퇴하시겠어요?
          </h3>
          <p className="text-body-2 text-center text-text-secondary">
            등록한 프로필, 개인정보 등 모든 데이터가
            <br />
            완전히 삭제되며 복구할 수 없어요.
          </p>
          <div className="flex w-full gap-1">
            <Button
              size="lg"
              color="secondaryColor"
              onClick={() => setIsModalOpen(false)}
            >
              취소
            </Button>
            <Button size="lg" onClick={handleUserDelete}>
              확인
            </Button>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default UserDeleteButton;
