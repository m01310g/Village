import Button from "@/app/components/Button";
import { useAcceptNeighbor } from "../hooks/useAcceptNeighbor";
import { useRejectNeighbor } from "../hooks/useRejectNeighbor";
import AddNeighborButton from "@/app/components/post/AddNeighborButton";
import { usePathname } from "next/navigation";

interface NeighborButtonsProps {
  nickname?: string;
  id: number;
  isMyNeighbor: boolean | number;
}

const NeighborButtons = ({ id, isMyNeighbor }: NeighborButtonsProps) => {
  const acceptMutation = useAcceptNeighbor(id);
  const rejectMutation = useRejectNeighbor(id);
  const pathname = usePathname();

  return (
    <>
      {isMyNeighbor === true || isMyNeighbor === 0 ? (
        <Button size="sm" color="secondaryColor">
          이웃
        </Button>
      ) : pathname === "/profile/neighbors" ? (
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
      ) : isMyNeighbor === 2 ? (
        <AddNeighborButton id={id} isNeighbor={isMyNeighbor} />
      ) : (
        isMyNeighbor === 4 && <></>
      )}
    </>
  );
};

export default NeighborButtons;
