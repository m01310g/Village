import { UserProfile } from "../hooks/useUserProfile";
import ProfileButtons from "./ProfileButtons";
import ProfileCareer from "./ProfileCareer";
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
        id={profile.id}
        profileImage={profile.profileImage ?? "/logos/symbol.svg"}
        nickname={profile.nickname}
        role={profile.type || "트레이너"}
        name={profile.name}
        neighborCount={profile.neighbor}
      />
      <div className="flex flex-col">
        <ProfileCareer careers={profile.webCareers} />
        <ProfileIntroduce introduction={profile.introduction ?? ""} />
      </div>
      <ProfileButtons
        isMyProfile={isMyProfile}
        isNeighbor={profile.isNeighbor}
        id={profile.id}
      />
    </section>
  );
};

export default ProfileViewSection;
