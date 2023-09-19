<template>
  <month-base>
    <template #header>
      <month-info :month="month" :year="year" @set-date="setDate" class="col-span-3" />
      <month-actions :canBeReseted="canBeReseted" @prev-month="prevMonth" @next-month="nextMonth" @reset-month="resetMonth" class="col-span-2" />
    </template>

    <template #default>
      <month-week :startDay="firstDayOfTheWeek" />
      <month-days :month="month" :year="year" :startDay="firstDayOfTheWeek" :activeDay="active" @activate-date="activateDate" :events="setEvents" />
    </template>

    <template #footer>
      <month-label :month="active.month" :year="active.year" :date="active.date" @reset-active-date="resetActiveDate" @show-month-settings="showMonthSettings" />
      <month-settings :month="month" :year="year" :startDay="firstDayOfTheWeek" :showSettings="showSettings" @change-month="changeMonth" @change-year="changeYear" @decrement-year="decrementYear" @increment-year="incrementYear" @hide-settings="hideSettings" @change-first-week-day="changeFirstDayOfTheWeek" />
    </template>
  </month-base>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch, toRefs } from "vue";
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

const props = defineProps<{
  setEvents: {
    date: number;
    month: number;
    year: number;
  }[];
}>();

const { setEvents } = toRefs(props);

const firstDayOfTheWeek: Ref<WeekFirstDay> = ref("monday");

const dateObject: Date = new Date();
const currentMonth: number = dateObject.getMonth() + 1;
const currentYear: number = dateObject.getFullYear();
const currentDate: number = dateObject.getDate();

const month: Ref<number> = ref(currentMonth);
const year: Ref<number> = ref(currentYear);

/** The selected active date. If none is selected - the current date is selected. */
const active = reactive({
  month: currentMonth,
  year: currentYear,
  date: currentDate
});

/** Reset month to initial state */
const canBeReseted: Ref<boolean> = ref(false);
const showSettings = reactive({
  forWeekDay: false,
  forDate: false
});

const emit = defineEmits([
  "getDate",
  "changeYear",
  "changeMonth",
  "decrementYear",
  "incrementYear",
  "changeFirstWeekDay",
  "nextMonth",
  "prevMonth",
  "resetMonth"
]);
const getDate = (activeDate: { month: number, year: number, date: number }): void => emit("getDate", activeDate);

onMounted(() => getDate(active));

watch(active, a => getDate(a));

function changeMonth(monthValue: Month): void {
  month.value = monthNumber(monthValue);
  canBeReseted.value = checkReset(year.value, month.value);

  return emit("changeMonth", monthValue);
}

function changeYear(yearValue: number): void {
  year.value = yearValue;
  canBeReseted.value = checkReset(year.value, month.value);

  return emit("changeYear", yearValue);
}

function decrementYear(decYear: number): void {
  year.value = decYear;
  canBeReseted.value = checkReset(year.value, month.value);

  return emit("decrementYear", decYear);
}

function incrementYear(incYear: number): void {
  year.value = incYear;
  canBeReseted.value = checkReset(year.value, month.value);

  return emit("incrementYear", incYear);
}

function checkReset(year: number, month: number): boolean {
  return year === currentYear && month === currentMonth ? false : true;
}

function setDate(): void {
  showSettings.forDate = true;
}

function changeFirstDayOfTheWeek(firstDay: WeekFirstDay): void {
  firstDayOfTheWeek.value = firstDay;

  return emit("changeFirstWeekDay", firstDay);
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

  return emit("nextMonth", { year: year.value, month: month.value });
}

function prevMonth(): void {
  year.value = month.value === 1 ? year.value - 1 : year.value;
  month.value = month.value === 1 ? 12 : month.value - 1;
  canBeReseted.value = checkReset(year.value, month.value);

  return emit("prevMonth", { year: year.value, month: month.value });
}

function resetMonth(): void {
  year.value = currentYear;
  month.value = currentMonth;
  canBeReseted.value = false;

  return emit("resetMonth", { year: year.value, month: month.value });
}

function resetActiveDate(): void {
  active.month = currentMonth;
  active.year = currentYear;
  active.date = currentDate;
}
</script>

<style>
@tailwind base;
@tailwind utilities;
</style>