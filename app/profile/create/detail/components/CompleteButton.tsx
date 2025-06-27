import Button from "@/app/components/Button";
import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";
import { ProfileFormData } from "@/app/profile/types/profileFormData";
import { ErrorResponse } from "@/app/types/ErrorResponse";
import { useRouter } from "next/navigation";

interface CompleteButtonProps {
  isFormValid: boolean;
  formData: ProfileFormData;
}

const CompleteButton = ({ isFormValid, formData }: CompleteButtonProps) => {
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const res = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-profile/registerWebProfile`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(formData),
        },
      );

      if (!res.ok) {
        const error: ErrorResponse = await res.json();
        if (error.statusCode === 400) {
          throw new Error(`요청 형식 오류: ${error.message}`);
        } else if (error.statusCode === 401) {
          throw new Error(
            `유효하지 않거나 기간이 만료된 토큰: ${error.message}`,
          );
        } else if (error.statusCode === 403) {
          throw new Error(`유저 회원이 아닙니다: ${error.message}`);
        } else if (error.statusCode === 409) {
          throw new Error(`이미 등록된 프로필이 있습니다: ${error.message}`);
        } else {
          throw new Error(error.message);
        }
      }

      router.replace(`/profile`);
    } catch (err: any) {
      console.error(err instanceof Error ? err.message : "알 수 없는 오류");
    }
  };
  return (
    <div className="sticky bottom-0 left-1/2 flex w-full max-w-[375px] gap-[6px] bg-background-primary px-4 py-3">
      <Button
        size="lg"
        color="secondaryColor"
        onClick={() => router.push("/profile/create/info")}
      >
        이전
      </Button>
      <Button size="lg" disabled={!isFormValid} onClick={handleSubmit}>
        등록
      </Button>
    </div>
  );
};

export default CompleteButton;
