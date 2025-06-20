import CareerAddButton from "./CareerAddButton";
import ProfileLabel from "../ProfileLabel";
import CareerCard from "./CareerCard";
import { CareerCardProps } from "../../types/careerCard";
import { useState } from "react";

const CareerSection = () => {
  const [careerList, setCareerList] = useState<CareerCardProps[]>([]);

  const handleAddCareer = (newCareer: CareerCardProps) => {
    setCareerList((prev) => [...prev, newCareer]);
  };

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <ProfileLabel label="경력사항" bold />
        <CareerAddButton onAddCareer={handleAddCareer} />
      </div>
      {careerList &&
        (careerList.length !== 0 ? (
          careerList.map((career, idx) => (
            <div key={idx}>
              <CareerCard {...career} />
              <div className="h-[1px] w-full bg-border-secondary" />
            </div>
          ))
        ) : (
          <>
            <div className="h-[1px] w-full bg-border-secondary" />
            <p className="text-body-2 py-3 text-center text-neutral-400">
              경력사항을 자유롭게 작성해주세요!
              <br />
              신입이면 넘어가셔도 좋습니다.
            </p>
          </>
        ))}
    </section>
  );
};

export default CareerSection;
