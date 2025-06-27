import { CareerCardProps } from "@/app/profile/types/careerCard";
import EditIcon from "@/public/icons/icn_edit1.svg";
import TrashIcon from "@/public/icons/icn_trash.svg";

const CareerCard = ({
  id,
  workplace,
  startDate,
  endDate,
  onEdit,
  onDelete,
}: CareerCardProps) => {
  return (
    <div className="flex justify-between py-3">
      <div className="flex flex-col gap-1">
        <h3 className="text-body-2 text-text-primary">{workplace}</h3>
        <span className="text-caption-3 text-neutral-600">
          {startDate} ~ {endDate}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={(e) => {
            e.preventDefault();
            onEdit({ id, workplace, startDate, endDate });
          }}
        >
          <EditIcon color="#737373" width="24px" height="24px" />
        </button>
        <button onClick={onDelete}>
          <TrashIcon color="#737373" width="24px" height="24px" />
        </button>
      </div>
    </div>
  );
};

export default CareerCard;
