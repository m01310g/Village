import CloseIcon from "@/public/icons/close-2.svg";

interface DistrictItemProps {
  district: string;
  onRemove: (district: string) => void;
}

const DistrictItem = ({ district, onRemove }: DistrictItemProps) => {
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onRemove(district);
  };

  return (
    <div className="flex items-center justify-center gap-1 rounded-[99px] border border-neutral-200 bg-white px-[6px] py-1">
      <span className="text-body-3 text-neutral-900">{district}</span>
      <button onClick={handleRemove}>
        <CloseIcon width="20px" height="20px" color="#171717" />
      </button>
    </div>
  );
};

export default DistrictItem;
