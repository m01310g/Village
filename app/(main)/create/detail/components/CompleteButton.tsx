import Button from "@/app/components/Button";

interface CompleteButtonProps {
  isFormValid: boolean;
  children: React.ReactNode;
  onClick: () => void;
  onBack: () => void;
}

const CompleteButton = ({
  isFormValid,
  children,
  onClick,
  onBack,
}: CompleteButtonProps) => {
  return (
    <div className="sticky bottom-0 left-1/2 flex w-full max-w-[500px] gap-[6px] bg-background-primary px-4 py-3">
      <Button size="lg" color="secondaryColor" onClick={onBack}>
        이전
      </Button>
      <Button size="lg" disabled={!isFormValid} onClick={onClick}>
        {children}
      </Button>
    </div>
  );
};

export default CompleteButton;
