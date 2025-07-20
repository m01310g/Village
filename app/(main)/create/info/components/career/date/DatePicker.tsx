import clsx from "clsx";
import { useRef } from "react";

interface DatePickerProps<T extends number> {
  items: T[];
  value: T;
  onChange: (val: T) => void;
  itemHeight?: number;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
}

const DatePicker = <T extends number>({
  items,
  value,
  onChange,
  itemHeight = 47,
  scrollRef,
}: DatePickerProps<T>) => {
  const localRef = useRef<HTMLDivElement>(null);
  const ref = scrollRef ?? localRef;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    const newItem = items[index];
    if (newItem !== undefined) onChange(newItem);
  };

  return (
    <div
      ref={ref}
      className="scrollbar-hide h-[8.8125rem] flex-1 snap-y snap-mandatory overflow-y-scroll"
      onScroll={handleScroll}
    >
      {[undefined, ...items, undefined].map((item, idx) => (
        <div
          key={item ?? `empty-${idx}`}
          className={clsx(
            "text-body-1 flex h-[2.9375rem] cursor-default snap-start items-center justify-center py-3",
            item === value ? "text-text-primary" : "text-neutral-200",
          )}
          onClick={() => item !== undefined && onChange(item)}
        >
          {item != null ? String(item).padStart(2, "0") : ""}
        </div>
      ))}
    </div>
  );
};

export default DatePicker;
