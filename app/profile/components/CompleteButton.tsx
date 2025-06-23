import Button from "@/app/components/Button";

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
  return (
    <div className="sticky bottom-0 left-1/2 w-full max-w-[375px] bg-background-primary px-4 py-3">
      <Button size="lg" disabled={!isFormValid} onClick={onClick}>
        {children}
      </Button>
    </div>
  );
};

export default CompleteButton;
