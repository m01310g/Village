import Button from "@/app/components/Button";
import { Area } from "react-easy-crop";
import { getCroppedImage } from "./utils/getCroppedImage";
import { ErrorResponse } from "@/app/types/ErrorResponse";
import { fetchWithAuth } from "@/app/lib/api/fetchWithAuth";

interface ProfileImageFooterProps {
  onClose: () => void;
  croppedAreaPixels: Area;
  selectedImageUrl: string;
  setImage: (image: string) => void;
  onUploadSuccess?: (url: string) => void;
}

interface ProfileImageUploadResponse {
  message: string;
  statusCode: number;
  data: string;
}

const ProfileImageFooter = ({
  onClose,
  croppedAreaPixels,
  selectedImageUrl,
  setImage,
  onUploadSuccess,
}: ProfileImageFooterProps) => {
  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const croppedImageFile = await getCroppedImage(
      selectedImageUrl,
      croppedAreaPixels,
    );

    if (!croppedImageFile) return;

    const formData = new FormData();
    formData.append("image", croppedImageFile);

    try {
      const res = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-profile/uploadWebProfileImage`,
        {
          headers: {},
          method: "POST",
          body: formData,
        },
      );

      if (!res.ok) {
        const error: ErrorResponse = await res.json();

        if (error.statusCode === 401) {
          throw new Error(
            `유효하지 않거나 기간이 만료된 토큰: ${error.message}`,
          );
        } else if (error.statusCode === 403) {
          throw new Error(`유저 회원이 아닙니다: ${error.message}`);
        } else {
          throw new Error(`프로필 사진 업로드 실패: ${error.message}`);
        }
      }

      const result: ProfileImageUploadResponse = await res.json();

      setImage(result.data);

      if (onUploadSuccess) {
        onUploadSuccess(result.data);
      }
    } catch (err) {
      console.error(err instanceof Error ? err.message : "알 수 없는 오류");
    }

    onClose();
  };
  return (
    <footer className="flex items-center justify-center gap-[0.375rem] px-4 py-5">
      <Button size="md" color="secondaryColor" onClick={onClose}>
        취소
      </Button>
      <Button size="md" color="primary" onClick={handleUpload}>
        등록
      </Button>
    </footer>
  );
};

export default ProfileImageFooter;
