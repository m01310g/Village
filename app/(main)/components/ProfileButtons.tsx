import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import ProfileNeighborButton from "./ProfileNeighborButton";
import { useNeighborsList } from "../profile/neighbors/hooks/useNeighborsList";

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
  const { data: neighbors } = useNeighborsList();
  const received = neighbors?.receiveds;

  return (
    <div className="flex gap-2">
      {isMyProfile ? (
        <>
          <Button
            size="md"
            color="secondaryColor"
            onClick={() => router.push("/edit/info")}
          >
            프로필 수정
          </Button>
          <Button
            size="md"
            color="primary"
            showDot={received && received.length > 0}
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
