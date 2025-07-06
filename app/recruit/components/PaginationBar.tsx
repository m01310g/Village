import LeftIcon from "@/public/icons/chevron-left.svg";
import RightIcon from "@/public/icons/chevron-right.svg";
import clsx from "clsx";

interface PaginationBarProps {
  totalPages: number;
  currentPage: number;
  onClickPage: (pageNumber: number) => void;
}

const PaginationBar = ({
  totalPages,
  currentPage,
  onClickPage,
}: PaginationBarProps) => {
  const handlePrev = () => {
    if (currentPage > 1) onClickPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onClickPage(currentPage + 1);
  };

  return (
    <div className="flex justify-center gap-1 pt-5">
      <button
        className="h-[38px] w-[38px] rounded-[4px] p-[10px]"
        onClick={handlePrev}
      >
        <LeftIcon width="24px" height="24px" color="#737373" />
      </button>
      {Array.from({ length: totalPages }).map((_, index) => {
        const pageNumber = index + 1;
        const isActive = currentPage === pageNumber;
        return (
          <button
            key={pageNumber}
            onClick={() => onClickPage(pageNumber)}
            className={clsx(
              isActive && "bg-sky-100",
              "text-body-2 h-[38px] w-[38px] rounded-[2px] p-[10px] text-text-tertiary",
            )}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        className="h-[38px] w-[38px] rounded-[4px] p-[10px]"
        onClick={handleNext}
      >
        <RightIcon width="24px" height="24px" color="#737373" />
      </button>
    </div>
  );
};

export default PaginationBar;
