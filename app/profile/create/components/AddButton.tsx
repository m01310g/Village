import Image from "next/image";

const AddButton = () => {
  return (
    <button
      className="border-border-secondary text-body-2 flex items-center gap-0.5 rounded-[8px] border px-3 py-2 text-neutral-400 hover:bg-neutral-100"
      onClick={(e) => e.preventDefault()}
    >
      <Image src={"/icons/plus.svg"} width={16} height={16} alt="추가 버튼" />
      추가
    </button>
  );
};
export default AddButton;
