import CloseIcon from "@/public/icons/close-2.svg";

interface DistrictItemProps {
  district: string;
  onRemove: (district: string) => void;
  sido?: string;
}

const DistrictItem = ({ district, onRemove, sido }: DistrictItemProps) => {
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (sido) {
      onRemove(`${sido}:${district}`);
    } else {
      onRemove(district);
    }
  };

  return (
    <div
      className="flex shrink-0 items-center justify-center gap-1 rounded-[99px] border border-neutral-200 bg-white px-[0.375rem] py-1"
      style={{ scrollbarWidth: "thin" }}
    >
      <span className="text-body-3 text-neutral-900">{district}</span>
      <button onClick={handleRemove}>
        <CloseIcon width="20px" height="20px" color="#171717" />
      </button>
    </div>
  );
};

export default DistrictItem;
