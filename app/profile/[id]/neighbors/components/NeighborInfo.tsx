interface NeighborInfoProps {
  nickname: string;
  name: string;
}

const NeighborInfo = ({ nickname, name }: NeighborInfoProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-10 w-10 rounded-full bg-neutral-200" />
      <div className="flex items-center gap-[6px]">
        <span className="text-body-2 text-text-primary">{nickname}</span>
        <div className="h-4 w-[1px] bg-neutral-400" />
        <span className="text-body-2 text-neutral-400">{name}</span>
      </div>
    </div>
  );
};

export default NeighborInfo;
