import Button from "@/app/components/Button";
import { useState, useLayoutEffect, useRef } from "react";
import clsx from "clsx";

interface DatePickerBottomSheetProps {
  placeholder: string;
  onSelect: (newDate: string) => void;
  onClose: () => void;
  initialDate?: string;
}

const DatePickerBottomSheet = ({
  placeholder,
  onSelect,
  onClose,
  initialDate,
}: DatePickerBottomSheetProps) => {
  const current = new Date();
  const currentYear = current.getFullYear();
  const currentMonth = current.getMonth() + 1;
  const currentDate = current.getDate();

  const years = Array.from({ length: currentYear - 1900 }, (_, i) => 1901 + i);
  const months = (year: number) =>
    year === currentYear
      ? Array.from({ length: 12 }, (_, i) => i + 1).slice(0, currentMonth)
      : Array.from({ length: 12 }, (_, i) => i + 1);
  const days = (year: number, month: number) => {
    const lastDay = new Date(year, month, 0).getDate();
    const maxDay =
      year === currentYear && month === currentMonth ? currentDate : lastDay;
    return Array.from({ length: lastDay }, (_, i) => i + 1).slice(0, maxDay);
  };

  const initial = initialDate ? new Date(initialDate) : current;

  const [year, setYear] = useState(initial.getFullYear());
  const [month, setMonth] = useState(initial.getMonth() + 1);
  const [day, setDay] = useState(initial.getDate());

  const yearRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const initScroll = () => {
      if (yearRef.current) {
        const yearIndex = years.indexOf(year);
        yearRef.current.scrollTop = (yearIndex - 1) * 47 + 47;
      }
      if (monthRef.current) {
        const monthIndex = months(year).indexOf(month);
        monthRef.current.scrollTop = (monthIndex - 1) * 47 + 47;
      }
      if (dayRef.current) {
        const dayIndex = days(year, month).indexOf(day);
        dayRef.current.scrollTop = (dayIndex - 1) * 47 + 47;
      }
    };

    initScroll();
  }, [year, month, day]);

  const overlayRef = useRef<HTMLDivElement>(null);

  return (
    <div className="absolute inset-0 z-50 flex h-full w-full max-w-[375px] items-end bg-neutral-950/45">
      <div className="absolute inset-0" onClick={onClose} />
      <div
        ref={overlayRef}
        className="relative z-10 flex min-h-[296px] w-full max-w-[375px] flex-col gap-3 rounded-t-[20px] bg-background-primary py-5"
      >
        <header>
          <h2 className="text-title-1 px-4 py-2 text-text-primary">
            {placeholder}
          </h2>
        </header>
        <main className="relative">
          <div className="pointer-events-none absolute left-0 right-0 top-[calc(50%-23.5px)] h-[47px] bg-neutral-50" />
          <div className="relative z-0 flex justify-between px-6 py-4 text-center text-xl font-bold text-text-primary">
            <div
              ref={yearRef}
              className="scrollbar-hide h-[141px] flex-1 snap-y snap-mandatory overflow-y-scroll"
              onScroll={(e) => {
                const scrollTop = e.currentTarget.scrollTop;
                const index = Math.round(scrollTop / 47);
                const newYear = years[index];
                if (newYear !== undefined) setYear(newYear);
              }}
            >
              {[undefined, ...years, undefined].map((y, idx) => (
                <div
                  key={y ?? `empty-${idx}`}
                  className={clsx(
                    "text-body-1 flex h-[47px] cursor-default snap-start items-center justify-center py-3",
                    y === year ? "text-text-primary" : "text-neutral-200",
                  )}
                  onClick={() => y !== undefined && setYear(y)}
                >
                  {y ?? ""}
                </div>
              ))}
            </div>
            <div
              ref={monthRef}
              className="scrollbar-hide h-[141px] flex-1 snap-y snap-mandatory overflow-y-scroll"
              onScroll={(e) => {
                const scrollTop = e.currentTarget.scrollTop;
                const list = months(year);
                const index = Math.round(scrollTop / 47);
                const newMonth = list[index];
                if (newMonth !== undefined) setMonth(newMonth);
              }}
            >
              {[undefined, ...months(year), undefined].map((m, idx) => (
                <div
                  key={m ?? `empty-${idx}`}
                  className={clsx(
                    "text-body-1 flex h-[47px] cursor-default snap-start items-center justify-center py-3",
                    m === month ? "text-text-primary" : "text-neutral-200",
                  )}
                  onClick={() => m !== undefined && setMonth(m)}
                >
                  {m != null ? String(m).padStart(2, "0") : ""}
                </div>
              ))}
            </div>
            <div
              ref={dayRef}
              className="scrollbar-hide h-[141px] flex-1 snap-y snap-mandatory overflow-y-scroll"
              onScroll={(e) => {
                const scrollTop = e.currentTarget.scrollTop;
                const list = days(year, month);
                const index = Math.round(scrollTop / 47);
                const newDay = list[index];
                if (newDay !== undefined) setDay(newDay);
              }}
            >
              {[undefined, ...days(year, month), undefined].map((d, idx) => (
                <div
                  key={d ?? `empty-${idx}`}
                  className={clsx(
                    "text-body-1 flex h-[47px] cursor-default snap-start items-center justify-center py-3",
                    d === day ? "text-text-primary" : "text-neutral-200",
                  )}
                  onClick={() => d !== undefined && setDay(d)}
                >
                  {d != null ? String(d).padStart(2, "0") : ""}
                </div>
              ))}
            </div>
          </div>
        </main>
        <footer className="px-2">
          <Button
            size="lg"
            color="primary"
            onClick={() =>
              onSelect(
                `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
              )
            }
          >
            저장
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default DatePickerBottomSheet;
