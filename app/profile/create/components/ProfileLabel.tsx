interface ProfileLabelProps {
  label: string;
  bold?: boolean;
  required?: boolean;
}

const ProfileLabel = ({ label, bold = false, required }: ProfileLabelProps) => {
  return (
    <label
      className={`text-text-primary ${bold ? "text-title-3" : "text-body-2"}`}
    >
      {label}
      {required && <span className="text-text-danger">*</span>}
    </label>
  );
};

export default ProfileLabel;
