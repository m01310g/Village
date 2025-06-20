const getToday = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};
import { useState } from "react";
import Image from "next/image";
import DatePickerBottomSheet from "./DatePickerBottomSheet";

interface DateInputProps {
  placeholder: string;
}

const DateInput = ({ placeholder }: DateInputProps) => {
  const [date, setDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (newDate: string) => {
    setDate(newDate);
    setIsOpen(false);
  };

  return (
    <>
      <div
        className="text-body-2 flex w-full cursor-pointer justify-between rounded-[4px] border border-border-secondary p-3"
        onClick={() => setIsOpen(true)}
      >
        <span className={date ? "text-text-primary" : "text-neutral-400"}>
          {date ? date : placeholder}
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
          initialDate={date || getToday()}
          onSelect={handleDateSelect}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default DateInput;
