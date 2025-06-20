import clsx from "clsx";

interface BottomSheetWrapperProps {
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const BottomSheetWrapper = ({
  onClose,
  children,
  className = "",
}: BottomSheetWrapperProps) => {
  return (
    <div className="fixed inset-0 z-50 flex h-full items-end justify-center">
      <div
        className="absolute z-0 h-full w-full max-w-[375px] bg-neutral-950/45"
        onClick={onClose}
      />
      <div
        className={clsx(
          "relative z-10 w-full max-w-[375px] rounded-t-[20px] bg-background-primary",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default BottomSheetWrapper;
