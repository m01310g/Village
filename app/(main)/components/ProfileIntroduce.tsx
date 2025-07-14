interface ProfileIntroduceProps {
  introduction: string;
}

const ProfileIntroduce = ({ introduction }: ProfileIntroduceProps) => {
  return (
    <span className="text-body-3 whitespace-pre-line text-text-primary">
      {introduction}
    </span>
  );
};

export default ProfileIntroduce;
