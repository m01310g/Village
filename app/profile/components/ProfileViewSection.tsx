import { UserProfile } from "../hooks/useUserProfile";
import ProfileButtons from "./ProfileButtons";
import ProfileInfoCard from "./ProfileInfoCard";
import ProfileIntroduce from "./ProfileIntroduce";

interface ProfileViewSectionProps {
  profile: UserProfile;
  isMyProfile: boolean;
}

const ProfileViewSection = ({
  profile,
  isMyProfile,
}: ProfileViewSectionProps) => {
  return (
    <section className="flex flex-col gap-4 p-4">
      <ProfileInfoCard
        profileImage={
          profile.profileImage === "url"
            ? "/logos/symbol.svg"
            : profile.profileImage
        }
        nickname={profile.nickname}
        role={profile.type || "트레이너"}
        name={profile.name}
        neighborCount={profile.neighbor}
      />
      <ProfileIntroduce introduction={profile.introduction} />
      <ProfileButtons
        isMyProfile={isMyProfile}
        isNeighbor={profile.isNeighbor}
        id={profile.id}
      />
    </section>
  );
};

export default ProfileViewSection;
