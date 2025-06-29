import AddUser from "@/public/icons/icn_user-profile-add-01.svg";

const AddNeighborButton = () => {
  return (
    <button
      className="flex h-8 items-center justify-center gap-1 px-2 py-[9px]"
      onClick={(e) => e.stopPropagation()}
    >
      <AddUser color="#00a6f4" width="16px" height="16px" />
      <span className="text-title-4 text-text-onsecondary">이웃 신청</span>
    </button>
  );
};

export default AddNeighborButton;
