import ProfileButtons from "./ProfileButtons";
import ProfileInfoCard from "./ProfileInfoCard";
import ProfileIntroduce from "./ProfileIntroduce";

interface ProfileViewSectionProps {
  nickname: string;
  name: string;
  role: string;
  introduction: string;
  neighborCount: number;
  isMyProfile: boolean;
}

const ProfileViewSection = ({
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
