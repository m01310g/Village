import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";

interface CompleteButtonProps {
  isFormValid: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const CompleteButton = ({
  isFormValid,
  children,
  onClick,
}: CompleteButtonProps) => {
  const router = useRouter();

  return (
    <div className="sticky bottom-0 left-1/2 flex w-full max-w-[375px] gap-[6px] bg-background-primary px-4 py-3">
      <Button
        size="lg"
        color="secondaryColor"
        onClick={() => router.push("/profile/create/info")}
      >
        이전
      </Button>
      <Button size="lg" disabled={!isFormValid} onClick={onClick}>
        {children}
      </Button>
    </div>
  );
};

export default CompleteButton;
