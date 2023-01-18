<template>
  <month-base>
    <template #header>
      <div class="grid grid-cols-5 p-3">
        <month-info :month="month" :year="year" @set-date="setDate" class="col-span-3" />
        <month-actions :canBeReseted="canBeReseted" @prev-month="prevMonth" @next-month="nextMonth" @reset-month="resetMonth" class="col-span-2" />
      </div>
    </template>

    <template #default>
      <month-week :startDay="firstDayOfTheWeek" />
      <month-days :month="month" :year="year" :startDay="firstDayOfTheWeek" :activeDay="active" @activate-date="activateDate" />
    </template>

    <template #footer>
      <month-label :month="active.month" :year="active.year" :date="active.date" @reset-active-date="resetActiveDate" @show-month-settings="showMonthSettings" />
      <month-settings :month="month" :year="year" :startDay="firstDayOfTheWeek" :showSettings="showSettings" @change-month="changeMonth" @change-year="changeYear" @decrement-year="decrementYear" @increment-year="incrementYear" @hide-settings="hideSettings" @change-first-week-day="changeFirstDayOfTheWeek" />
    </template>
  </month-base>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { monthNumber } from "typescript-calendar-date";

/** Types */
import type { WeekFirstDay, Month } from "./date-processing";
import type { Ref } from "vue";

/** Components */
import MonthBase from "./MonthBase.vue";
import MonthInfo from "./MonthInfo.vue";
import MonthWeek from "./MonthWeek.vue";
import MonthDays from "./MonthDays.vue";
import MonthLabel from "./MonthLabel.vue";
import MonthActions from "./MonthActions.vue";
import MonthSettings from "./MonthSettings.vue";

const firstDayOfTheWeek: Ref<WeekFirstDay> = ref("monday");

const dateObject = new Date();
const currentMonth = dateObject.getMonth() + 1;
const currentYear = dateObject.getFullYear();
const currentDate = dateObject.getDate();

const month = ref(currentMonth);
const year = ref(currentYear);

/** The selected active date. If none is selected - the current date is selected. */
const active = reactive({
  month: currentMonth,
  year: currentYear,
  date: currentDate
});

/** Reset month to initial state */
const canBeReseted = ref(false);
const showSettings = reactive({
  forWeekDay: false,
  forDate: false
});

function changeMonth(monthValue: Month): void {
  month.value = monthNumber(monthValue);
  canBeReseted.value = checkReset(year.value, month.value);
}

function changeYear(yearValue: number): void {
  year.value = yearValue;
  canBeReseted.value = checkReset(year.value, month.value);
}

function decrementYear(decYear: number): void {
  year.value = decYear;
  canBeReseted.value = checkReset(year.value, month.value);
}

function incrementYear(incYear: number): void {
  year.value = incYear;
  canBeReseted.value = checkReset(year.value, month.value);
}

function checkReset(year: number, month: number): boolean {
  return year === currentYear && month === currentMonth ? false : true;
}

function setDate () {
  showSettings.forDate = true;
}

function changeFirstDayOfTheWeek(firstDay: WeekFirstDay) {
  firstDayOfTheWeek.value = firstDay;
}

function showMonthSettings(): void {
  showSettings.forWeekDay = true;
}

function hideSettings(): void {
  showSettings.forWeekDay = false;
  showSettings.forDate = false;
}

function activateDate(date: number, month: Month, year: number): void {
  const mnt = monthNumber(month);

  active.month = mnt;
  active.year = year;
  active.date = date;
}

function nextMonth(): void {
  year.value = month.value === 12 ? year.value + 1 : year.value;
  month.value = month.value === 12 ? 1 : month.value + 1;
  canBeReseted.value = checkReset(year.value, month.value);
}

function prevMonth(): void {
  year.value = month.value === 1 ? year.value - 1 : year.value;
  month.value = month.value === 1 ? 12 : month.value - 1;
  canBeReseted.value = checkReset(year.value, month.value);
}

function resetMonth(): void {
  year.value = currentYear;
  month.value = currentMonth;
  canBeReseted.value = false;
}

function resetActiveDate(): void {
  active.month = currentMonth;
  active.year = currentYear;
  active.date = currentDate;
}
</script>