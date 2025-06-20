import CareerAddButton from "./CareerAddButton";
import ProfileLabel from "../ProfileLabel";

const CareerSection = () => {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <ProfileLabel label="경력사항" bold />
        <CareerAddButton />
      </div>
      <div className="h-[1px] w-full bg-border-secondary" />
      <p className="text-body-2 py-3 text-center text-neutral-400">
        경력사항을 자유롭게 작성해주세요!
        <br />
        신입이면 넘어가셔도 좋습니다.
      </p>
    </section>
  );
};

export default CareerSection;
