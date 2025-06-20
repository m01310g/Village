import Button from "@/app/components/Button";
import { useState, useLayoutEffect, useRef } from "react";
import DatePicker from "./DatePicker";
import { getDays, getMonths, getYears } from "./utils/dateUtils";

interface DatePickerBottomSheetProps {
  placeholder: string;
  onSelect: (newDate: string) => void;
  onClose: () => void;
  initialDate?: string;
  minDate?: string;
  maxDate?: string;
}

const DatePickerBottomSheet = ({
  placeholder,
  onSelect,
  onClose,
  initialDate,
  minDate,
  maxDate,
}: DatePickerBottomSheetProps) => {
  const current = new Date();

  const initial = initialDate ? new Date(initialDate) : current;

  const [year, setYear] = useState(initial.getFullYear());
  const [month, setMonth] = useState(initial.getMonth() + 1);
  const [day, setDay] = useState(initial.getDate());

  const years = getYears(minDate, maxDate);
  const months = getMonths(year, minDate, maxDate);
  const days = getDays(year, month, minDate, maxDate);

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
        const monthIndex = months.indexOf(month);
        monthRef.current.scrollTop = (monthIndex - 1) * 47 + 47;
      }
      if (dayRef.current) {
        const dayIndex = days.indexOf(day);
        dayRef.current.scrollTop = (dayIndex - 1) * 47 + 47;
      }
    };

    initScroll();
  }, [year, month, day, years, months, days]);

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
            <DatePicker
              items={years}
              value={year}
              onChange={setYear}
              scrollRef={yearRef}
            />
            <DatePicker
              items={months}
              value={month}
              onChange={setMonth}
              scrollRef={monthRef}
            />
            <DatePicker
              items={days}
              value={day}
              onChange={setDay}
              scrollRef={dayRef}
            />
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
