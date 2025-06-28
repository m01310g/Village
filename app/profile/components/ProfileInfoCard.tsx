import Image from "next/image";

interface ProfileInfoCardProps {
  profileImage: string;
  nickname: string;
  name: string;
  role: "TRAINER";
  neighborCount: number;
}

const ProfileInfoCard = ({
  profileImage,
  nickname,
  name,
  role,
  neighborCount,
}: ProfileInfoCardProps) => {
  const roles = { TRAINER: "트레이너" };
  return (
    <div className="flex items-center justify-between">
      <div className="h-20 w-20 overflow-hidden rounded-full">
        <Image src={profileImage} width={80} height={80} alt="내 프로필 사진" />
      </div>
      <div className="flex flex-1 flex-col gap-2 pl-7">
        <div className="flex items-center gap-2">
          <h3 className="text-title-2 text-text-primary">{nickname}</h3>
          <div className="h-4 w-0.5 bg-neutral-400" />
          <h3 className="text-title-2 text-neutral-400">{name}</h3>
        </div>
        <div className="flex gap-2">
          <span className="text-body-3 text-text-tertiary">
            {roles[role] || "트레이너"}
          </span>
          <div className="flex gap-1">
            <span className="text-body-3 text-text-onsecondary">이웃</span>
            <span className="text-title-4 text-text-onsecondary">{`${neighborCount}명`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
