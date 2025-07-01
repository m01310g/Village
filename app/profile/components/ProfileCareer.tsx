import { WebCareer } from "../types/webCareer";

interface ProfileCareerProps {
  careers: WebCareer[];
}

const ProfileCareer = ({ careers }: ProfileCareerProps) => {
  return careers.map((career, i) => (
    <span key={i} className="text-body-3 whitespace-pre-line text-text-primary">
      {`${career.where} (${career.start.slice(0, 7).replace(/-/g, ".")} ~ ${career.current === 0 ? career.end?.slice(0, 7).replace(/-/g, ".") : "현재"})`}
    </span>
  ));
};

export default ProfileCareer;
