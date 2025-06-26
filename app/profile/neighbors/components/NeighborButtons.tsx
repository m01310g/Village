import Button from "@/app/components/Button";
import { useState } from "react";
import NeighborDeleteBottomSheet from "./NeighborDeleteBottomSheet";
import { useAcceptNeighbor } from "../hooks/useAcceptNeighbor";
import { useRejectNeighbor } from "../hooks/useRejectNeighbor";

interface NeighborButtonsProps {
  nickname?: string;
  id: number;
  isMyNeighbor: boolean;
}

const NeighborButtons = ({
  nickname,
  id,
  isMyNeighbor,
}: NeighborButtonsProps) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const acceptMutation = useAcceptNeighbor(id);
  const rejectMutation = useRejectNeighbor(id);

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
          <Button
            size="sm"
            color="secondaryMono"
            onClick={() => rejectMutation.mutate()}
          >
            거절
          </Button>
          <Button
            size="sm"
            color="primary"
            onClick={() => acceptMutation.mutate()}
          >
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
