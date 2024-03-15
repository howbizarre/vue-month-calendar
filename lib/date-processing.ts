import { monthName, numberOfDaysInMonth, dayOfWeek } from "typescript-calendar-date";
import type { CalendarMonth, CalendarYear } from "typescript-calendar-date";

type Month = "jan" | "feb" | "mar" | "apr" | "may" | "jun" | "jul" | "aug" | "sep" | "oct" | "nov" | "dec";

type MonthArray = {
  day: string;
  date: number;
  month: Month;
  year: number;
};

type WeekFirstDay = "monday" | "sunday";

const totalDaysInMonthGrid = 42;

const monthsInYear = {
  "short": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
  "long": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

const weekDays = {
  "firstDay": {
    "0": "sunday",
    "1": "monday",
  },
  "sunday": {
    "short": ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
    "long": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
  "monday": {
    "short": ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
    "long": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  },
};

/**
 * Fills the array with the dates, days, months, and years for a given month and year.
 * @param month - The month number (1-12).
 * @param year - The year.
 * @param firstDayOfTheWeek - The first day of the week.
 * @returns An array of objects containing the day, date, month, and year for each day in the month.
 */
const fillMonth = (month: number, year: number, firstDayOfTheWeek: WeekFirstDay): MonthArray[] => {
  const fullFiledArray = new Array();

  const nameOfMonth = monthName(month);
  const viewYear: CalendarYear = {
    year: year,
  };
  const viewMonth: CalendarMonth = {
    ...viewYear,
    month: nameOfMonth,
  };

  const firstWeekDayInMonth = dayOfWeek({ ...viewMonth, day: 1 });
  const countDaysInViewMonth = numberOfDaysInMonth(viewMonth);
  const countDaysInPrevMonth = numberOfDaysInMonth({ year: month === 1 ? year - 1 : year, month: monthName(month - 1) });

  const daysOffsets = weekDays[firstDayOfTheWeek].short.indexOf(firstWeekDayInMonth);
  const daysPreset = totalDaysInMonthGrid - (daysOffsets + countDaysInViewMonth);

  let dOff = daysOffsets;
  let dPrs = daysPreset < 8 ? 7 - daysPreset : 14 - daysPreset;

  for (let i = 0; i < daysOffsets; i += 1) {
    const date = countDaysInPrevMonth + (i + 1) - daysOffsets;
    const day = weekDays[firstDayOfTheWeek].short[i];
    const _month = monthName(month - 1);
    const yr = month === 1 ? year - 1 : year;

    fullFiledArray.push({
      day: day,
      date: date,
      month: _month,
      year: yr,
    });
  }

  for (let i = 0; i < countDaysInViewMonth; i += 1) {
    const date = i + 1;
    const day = weekDays[firstDayOfTheWeek].short[dOff];
    const _month = monthName(month);
    const yr = year;

    dOff = dOff > 5 ? 0 : dOff + 1;

    fullFiledArray.push({
      day: day,
      date: date,
      month: _month,
      year: yr,
    });
  }

  for (let i = 0; i < daysPreset; i += 1) {
    const date = i + 1;
    const day = weekDays[firstDayOfTheWeek].short[dPrs];
    const _month = monthName(month + 1);
    const yr = month === 12 ? year + 1 : year;

    dPrs = dPrs > 5 ? 0 : dPrs + 1;

    fullFiledArray.push({
      day: day,
      date: date,
      month: _month,
      year: yr,
    });
  }

  return fullFiledArray;
};

export { fillMonth, weekDays, monthsInYear, type WeekFirstDay, type Month, type MonthArray };
