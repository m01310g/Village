import Button from "@/app/components/Button";

interface CreateButtonProps {
  isFormValid: boolean;
}

const CreateButton = ({ isFormValid }: CreateButtonProps) => {
  return (
    <div className="sticky bottom-0 left-1/2 w-full max-w-[375px] bg-background-primary px-4 py-3">
      <Button size="lg" disabled={!isFormValid}>
        등록 완료
      </Button>
    </div>
  );
};

export default CreateButton;
