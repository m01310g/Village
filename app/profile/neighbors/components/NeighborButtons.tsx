import Button from "@/app/components/Button";
import { useState } from "react";
import NeighborDeleteBottomSheet from "./NeighborDeleteBottomSheet";

interface NeighborButtonsProps {
  nickname?: string;
  isMyNeighbor: boolean;
}

const NeighborButtons = ({ nickname, isMyNeighbor }: NeighborButtonsProps) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <>
      {isMyNeighbor ? (
        <Button
          size="sm"
          color="secondaryColor"
          onClick={() => setIsBottomSheetOpen(true)}
        >
          이웃
        </Button>
      ) : (
        <div className="flex items-center justify-center gap-1">
          <Button size="sm" color="secondaryMono">
            거절
          </Button>
          <Button size="sm" color="primary">
            수락
          </Button>
        </div>
      )}
      {isBottomSheetOpen && (
        <NeighborDeleteBottomSheet
          setIsOpen={setIsBottomSheetOpen}
          nickname={nickname || ""}
        />
      )}
    </>
  );
};

export default NeighborButtons;
