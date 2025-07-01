import Input from "@/app/components/Input";
import NameSection from "./NameSection";
import NicknameSection from "./NicknameSection";
import CareerSection from "./career/CareerSection";
import IntroduceSection from "./IntroduceSection";
import { WebCareer } from "@/app/profile/types/webCareer";
import ProfileImageSection from "@/app/profile/components/profileImage/ProfileImageSection";

interface ProfileFormProps {
  formData: {
    name: string;
    nickname: string;
    webCareers: WebCareer[];
    introduction?: string;
    profileImage?: string;
  };
  onChangeField: (
    field: keyof ProfileFormProps["formData"],
    value: string | WebCareer[],
  ) => void;
  name: string;
  nickname: string;
  nameError?: string | null;
  nicknameError?: string | null;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeNickname: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCompositionStartName?: () => void;
  onCompositionEndName?: (e: React.CompositionEvent<HTMLInputElement>) => void;
  onCompositionStartNickname?: () => void;
  onCompositionEndNickname?: (
    e: React.CompositionEvent<HTMLInputElement>,
  ) => void;
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: (value: boolean) => void;
  initialImage?: string;
}

const ProfileForm = ({
  formData,
  onChangeField,
  name,
  nickname,
  nameError,
  nicknameError,
  onChangeName,
  onChangeNickname,
  onCompositionStartName,
  onCompositionEndNickname,
  onCompositionEndName,
  onCompositionStartNickname,
  isBottomSheetOpen,
  setIsBottomSheetOpen,
  initialImage,
}: ProfileFormProps) => {
  return (
    <form className="flex w-full max-w-[375px] flex-1 flex-col gap-8 overflow-y-auto p-4">
      <ProfileImageSection
        isBottomSheetOpen={isBottomSheetOpen}
        setIsBottomSheetOpen={setIsBottomSheetOpen}
        onClickOpen={() => setIsBottomSheetOpen(true)}
        onUploadSuccess={(url) => onChangeField("profileImage", url)}
        initialImage={initialImage}
      />
      <NameSection
        name={name}
        error={nameError ?? null}
        onChange={onChangeName}
        onCompositionStart={onCompositionStartName}
        onCompositionEnd={onCompositionEndName}
      />
      <NicknameSection
        nickname={nickname}
        error={nicknameError ?? null}
        onChange={onChangeNickname}
        onCompositionStart={onCompositionStartNickname}
        onCompositionEnd={onCompositionEndNickname}
      />
      <Input
        label="업종"
        required
        value="트레이너"
        disabled
        onChange={() => {}}
      />
      <CareerSection
        initialCareers={formData.webCareers}
        onChangeCareers={(updatedCareers: WebCareer[]) =>
          onChangeField("webCareers", updatedCareers)
        }
      />
      <IntroduceSection
        introduction={formData.introduction ?? ""}
        onChangeIntroduction={(value: string) =>
          onChangeField("introduction", value)
        }
      />
    </form>
  );
};

export default ProfileForm;
