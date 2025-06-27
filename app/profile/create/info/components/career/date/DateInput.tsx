import { useState } from "react";
import Image from "next/image";
import DatePickerBottomSheet from "./DatePickerBottomSheet";
import clsx from "clsx";

interface DateInputProps {
  placeholder: string;
  value: string;
  setDate: (newDate: string) => void;
  isStartDate?: boolean;
  isEndDate?: boolean;
  startDate?: string;
  endDate?: string;
  disabled?: boolean;
}

const DateInput = ({
  placeholder,
  value,
  setDate,
  isStartDate,
  isEndDate,
  startDate,
  endDate,
  disabled,
}: DateInputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (newDate: string) => {
    setDate(newDate);
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={clsx(
          "text-body-2 flex w-full justify-between rounded-[4px] border border-border-secondary p-3",
          { "cursor-not-allowed bg-neutral-50": disabled },
          { "cursor-pointer": !disabled },
        )}
        onClick={() => {
          if (!disabled) setIsOpen(true);
        }}
      >
        <span
          className={
            value && !disabled ? "text-text-primary" : "text-neutral-400"
          }
        >
          {!disabled && value ? value : placeholder}
        </span>
        <Image
          src={"/icons/icn_calendar.svg"}
          alt="달력"
          width={20}
          height={20}
        />
      </div>
      {isOpen && (
        <DatePickerBottomSheet
          placeholder={placeholder}
          initialDate={value}
          onSelect={handleDateSelect}
          onClose={() => setIsOpen(false)}
          minDate={isEndDate && startDate ? startDate : undefined}
          maxDate={isStartDate && endDate ? endDate : undefined}
        />
      )}
    </>
  );
};

export default DateInput;
