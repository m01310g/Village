import BottomSheetWrapper from "@/app/components/BottomSheetWrapper";

interface NeighborDeleteBottomSheetProps {
  nickname: string;
  setIsOpen: (isOpen: boolean) => void;
}

const NeighborDeleteBottomSheet = ({
  nickname,
  setIsOpen,
}: NeighborDeleteBottomSheetProps) => {
  return (
    <BottomSheetWrapper onClose={() => setIsOpen(false)} className="py-5">
      <ul className="flex flex-col">
        <li className="text-body-2 cursor-pointer px-4 py-5 text-text-danger">
          {`${nickname}과 이웃 끊기`}
        </li>
      </ul>
    </BottomSheetWrapper>
  );
};

export default NeighborDeleteBottomSheet;
