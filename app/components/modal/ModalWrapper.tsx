interface ModalWrapperProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalWrapper = ({ children, onClose }: ModalWrapperProps) => {
  return (
    <div
      className="fixed inset-0 z-50 m-auto flex max-w-[500px] items-center justify-center bg-neutral-950/45"
      onClick={onClose}
    >
      <div
        className="flex w-[343px] flex-col items-center justify-center gap-5 rounded-[6px] bg-background-primary px-3 py-5"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
