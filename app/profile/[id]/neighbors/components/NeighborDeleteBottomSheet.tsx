interface NeighborDeleteBottomSheetProps {
  nickname: string;
  setIsOpen: (isOpen: boolean) => void;
}

const NeighborDeleteBottomSheet = ({
  nickname,
  setIsOpen,
}: NeighborDeleteBottomSheetProps) => {
  return (
    <div className="fixed inset-0 z-50 flex h-full items-end justify-center">
      <div
        className="absolute z-0 h-full w-full max-w-[375px] bg-neutral-950/45"
        onClick={() => setIsOpen(false)}
      />
      <div
        className="fixed bottom-0 z-50 w-full max-w-[375px] rounded-t-[20px] bg-background-primary py-5"
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="flex flex-col">
          <li className="text-body-2 cursor-pointer px-4 py-5 text-text-danger">
            {`${nickname}과 이웃 끊기`}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NeighborDeleteBottomSheet;
