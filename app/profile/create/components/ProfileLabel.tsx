interface ProfileLabelProps {
  label: string;
  bold?: boolean;
}

const ProfileLabel = ({ label, bold = false }: ProfileLabelProps) => {
  return (
    <label
      className={`text-text-primary ${bold ? "text-title-3" : "text-body-2"}`}
    >
      {label}
    </label>
  );
};

export default ProfileLabel;
