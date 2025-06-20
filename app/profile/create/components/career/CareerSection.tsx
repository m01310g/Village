import CareerAddButton from "./CareerAddButton";
import ProfileLabel from "../ProfileLabel";
import CareerCard from "./CareerCard";
import { CareerData } from "../../types/careerCard";
import { useState } from "react";
import CareerAddBottomSheet from "./CareerAddBottomSheet";

const CareerSection = () => {
  const [careerList, setCareerList] = useState<CareerData[]>([]);
  const [editTarget, setEditTarget] = useState<CareerData | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddCareer = (newCareer: CareerData) => {
    // setCareerList((prev) => [...prev, newCareer]);
    setCareerList((prev) => {
      const exists = prev.find((c) => c.id === newCareer.id);
      if (exists) {
        return prev.map((c) => (c.id === newCareer.id ? newCareer : c));
      }
      return [...prev, newCareer];
    });
  };

  const handleEdit = (career: CareerData) => {
    setEditTarget(career);
    setIsOpen(true);
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
              <CareerCard
                {...career}
                onEdit={handleEdit}
                onDelete={() => {
                  setCareerList((prev) => prev.filter((_, i) => i !== idx));
                }}
              />
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
      {isOpen && (
        <CareerAddBottomSheet
          setOpen={setIsOpen}
          onSave={handleAddCareer}
          onClose={() => setIsOpen(false)}
          initialData={editTarget}
        />
      )}
    </section>
  );
};

export default CareerSection;
