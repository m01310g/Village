import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import ProfileNeighborButton from "./ProfileNeighborButton";

interface ProfileButtonProps {
  isMyProfile: boolean;
  isNeighbor: number;
  id: number;
}

const ProfileButtons = ({
  isMyProfile,
  isNeighbor,
  id,
}: ProfileButtonProps) => {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      {isMyProfile ? (
        <>
          <Button
            size="md"
            color="secondaryColor"
            onClick={() => router.push("/profile/edit")}
          >
            프로필 수정
          </Button>
          <Button
            size="md"
            color="primary"
            onClick={() => router.push("/profile/neighbors")}
          >
            내 이웃 목록
          </Button>
        </>
      ) : (
        <ProfileNeighborButton id={id} isNeighbor={isNeighbor} />
      )}
    </div>
  );
};

export default ProfileButtons;
