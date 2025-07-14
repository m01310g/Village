import CareerAddButton from "./CareerAddButton";
import CareerCard from "./CareerCard";
import { useEffect, useState } from "react";
import CareerAddBottomSheet from "./CareerAddBottomSheet";
import ProfileLabel from "../../../components/ProfileLabel";
import { WebCareer } from "@/app/(main)/types/webCareer";
import { CareerData } from "@/app/(main)/types/careerCard";

interface CareerSectionProps {
  onChangeCareers: (careers: WebCareer[]) => void;
  initialCareers: WebCareer[];
}

const CareerSection = ({
  onChangeCareers,
  initialCareers,
}: CareerSectionProps) => {
  const [careerList, setCareerList] = useState<CareerData[]>([]);
  const [editTarget, setEditTarget] = useState<CareerData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized && initialCareers.length > 0) {
      const transformed = initialCareers.map((career, idx) => ({
        id: `${idx}-${career.where}`,
        workplace: career.where,
        startDate: career.start,
        endDate: career.end === "현재 근무 중" ? "" : career.end,
        isCurrent: career.current === 1,
      }));
      setCareerList(transformed);
      setIsInitialized(true);
    }
  }, [initialCareers, isInitialized]);

  useEffect(() => {
    const webCareers: WebCareer[] = careerList.map(
      ({ workplace, startDate, endDate, isCurrent }) => ({
        where: workplace,
        start: startDate,
        end: isCurrent ? null : endDate,
        current: isCurrent ? 1 : 0,
      }),
    );
    onChangeCareers(webCareers);
  }, [onChangeCareers, careerList]);

  const handleAddCareer = (newCareer: CareerData) => {
    setCareerList((prev) => {
      const exists = prev.find((c) => c.id === newCareer.id);
      const updated = exists
        ? prev.map((c) => (c.id === newCareer.id ? newCareer : c))
        : [...prev, newCareer];

      return updated;
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
        {careerList.length < 10 && (
          <CareerAddButton onAddCareer={handleAddCareer} />
        )}
      </div>
      {careerList &&
        (careerList.length !== 0 ? (
          careerList.map((career) => (
            <div key={career.id}>
              <CareerCard
                {...career}
                onEdit={handleEdit}
                onDelete={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  setCareerList((prev) =>
                    prev.filter((c) => c.id !== career.id),
                  );
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
