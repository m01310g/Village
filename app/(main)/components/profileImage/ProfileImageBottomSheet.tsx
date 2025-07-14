import { Dispatch, SetStateAction } from "react";
import ArrowRight from "@/public/icons/chevron-right.svg";

interface ProfileImageBottomSheetProps {
  setSelectedImageUrl: (imgUrl: string) => void;
  setStep: Dispatch<SetStateAction<"select" | "gallery" | "camera" | "crop">>;
}

const ProfileImageBottomSheet = ({
  setSelectedImageUrl,
  setStep,
}: ProfileImageBottomSheetProps) => {
  return (
    <div className="flex w-full flex-col gap-3 py-2">
      <h2 className="text-title-1 px-4 py-2 text-text-primary">사진 올리기</h2>
      <ul>
        <li
          className="h-[61px] cursor-pointer px-4 py-5"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <div className="flex w-full justify-between text-left">
            <span className="text-body-2">사진 보관함</span>
            <ArrowRight width="20px" height="20px" color="#171717" />
          </div>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

                if (file.size > maxSizeInBytes) {
                  alert("이미지 크기는 5MB 이하만 업로드할 수 있습니다.");
                  e.target.value = ""; // 선택 초기화
                  return;
                }

                const imageUrl = URL.createObjectURL(file);
                setSelectedImageUrl(imageUrl);
                setStep("crop");
              }
            }}
          />
        </li>
      </ul>
    </div>
  );
};

export default ProfileImageBottomSheet;
