import Button from "@/app/components/Button";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

interface ProfileButtonProps {
  isMyProfile: boolean;
}

const ProfileButtons = ({ isMyProfile }: ProfileButtonProps) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const id = user?.id || null;

  return (
    <div className="flex gap-2">
      {isMyProfile ? (
        <>
          <Button size="md" color="secondaryColor">
            프로필 수정
          </Button>
          <Button
            size="md"
            color="primary"
            onClick={() => router.push(`/profile/${id}/neighbors`)}
          >
            내 이웃 목록
          </Button>
        </>
      ) : (
        <Button size="lg" color="primary">
          이웃 맺기
        </Button>
      )}
    </div>
  );
};

export default ProfileButtons;
