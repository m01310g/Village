import ProfileButtons from "./ProfileButtons";
import ProfileInfoCard from "./ProfileInfoCard";
import ProfileIntroduce from "./ProfileIntroduce";

interface ProfileViewSectionProps {
  profileImage: string;
  nickname: string;
  name: string;
  role: "TRAINER";
  introduction: string;
  neighborCount: number;
  isMyProfile: boolean;
}

const ProfileViewSection = ({
  profileImage,
  nickname,
  name,
  role,
  introduction,
  neighborCount,
  isMyProfile,
}: ProfileViewSectionProps) => {
  return (
    <section className="flex flex-col gap-4 p-4">
      <ProfileInfoCard
        profileImage={profileImage}
        nickname={nickname}
        role={role}
        name={name}
        neighborCount={neighborCount}
      />
      <ProfileIntroduce introduction={introduction} />
      <ProfileButtons isMyProfile={isMyProfile} />
    </section>
  );
};

export default ProfileViewSection;
