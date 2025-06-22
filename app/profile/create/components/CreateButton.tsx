import Button from "@/app/components/Button";

interface CreateButtonProps {
  isFormValid: boolean;
  onClick: () => void;
}

const CreateButton = ({ isFormValid, onClick }: CreateButtonProps) => {
  return (
    <div className="sticky bottom-0 left-1/2 w-full max-w-[375px] bg-background-primary px-4 py-3">
      <Button size="lg" disabled={!isFormValid} onClick={onClick}>
        등록 완료
      </Button>
    </div>
  );
};

export default CreateButton;
