interface ProfileInfoCardProps {
  nickname: string;
  name: string;
  role: string;
  neighborCount: number;
}

const ProfileInfoCard = ({
  nickname,
  name,
  role,
  neighborCount,
}: ProfileInfoCardProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="h-20 w-20 rounded-full bg-background-tertiary" />
      <div className="flex flex-1 flex-col gap-2 pl-7">
        <div className="flex items-center gap-2">
          <h3 className="text-title-2 text-text-primary">{nickname}</h3>
          <div className="h-4 w-0.5 bg-neutral-400" />
          <h3 className="text-title-2 text-neutral-400">{name}</h3>
        </div>
        <div className="flex gap-2">
          <span className="text-body-3 text-text-tertiary">{role}</span>
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
