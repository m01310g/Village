import Button from "@/app/components/Button";

interface RecruitFooterProps {
  site: string;
}

const RecruitFooter = ({ site }: RecruitFooterProps) => {
  return (
    <footer className="bg-background-primary px-4 py-2">
      <a href={site} target="_blank" rel="noopener noreferrer">
        <Button color="primary" size="lg">
          사이트 바로가기
        </Button>
      </a>
    </footer>
  );
};

export default RecruitFooter;
