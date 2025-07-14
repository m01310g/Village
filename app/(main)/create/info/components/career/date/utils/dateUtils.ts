export const parseDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return { year, month, day };
};

export const getYears = (minDate?: string, maxDate?: string) => {
  const todayYear = new Date().getFullYear();
  const minYear = minDate ? parseDate(minDate).year : 1901;
  const maxYear = maxDate
    ? Math.min(parseDate(maxDate).year, todayYear)
    : todayYear;
  return Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);
};

export const getMonths = (
  selectedYear: number,
  minDate?: string,
  maxDate?: string,
) => {
  let minMonth = 1;
  let maxMonth = 12;

  if (minDate && parseDate(minDate).year === selectedYear) {
    minMonth = parseDate(minDate).month;
  }
  if (maxDate && parseDate(maxDate).year === selectedYear) {
    maxMonth = parseDate(maxDate).month;
  }

  const current = new Date();
  if (!maxDate && selectedYear === current.getFullYear()) {
    maxMonth = current.getMonth() + 1;
  }

  return Array.from(
    { length: maxMonth - minMonth + 1 },
    (_, i) => minMonth + i,
  );
};

export const getDays = (
  selectedYear: number,
  selectedMonth: number,
  minDate?: string,
  maxDate?: string,
) => {
  const date = new Date(selectedYear, selectedMonth, 0);
  const lastDay = date.getDate();

  let minDay = 1;
  let maxDay = lastDay;

  if (
    minDate &&
    parseDate(minDate).year === selectedYear &&
    parseDate(minDate).month === selectedMonth
  ) {
    minDay = parseDate(minDate).day;
  }

  if (
    maxDate &&
    parseDate(maxDate).year === selectedYear &&
    parseDate(maxDate).month === selectedMonth
  ) {
    maxDay = parseDate(maxDate).day;
  }

  const current = new Date();
  if (
    !maxDate &&
    selectedYear === current.getFullYear() &&
    selectedMonth === current.getMonth() + 1
  ) {
    maxDay = current.getDate();
  }

  return Array.from({ length: maxDay - minDay + 1 }, (_, i) => minDay + i);
};
