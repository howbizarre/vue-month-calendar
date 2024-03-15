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

let reactivEvents = props.setEvents.map(event => reactive(event));

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

type ActiveDate = {
  month: number;
  year: number;
  date: number;
};

/**
 * Sets the active date and emits the "getDate" event.
 * 
 * @param {ActiveDate} activeDate - The active date object containing the month, year, and date.
 * @returns {void}
 */
const getDate = (activeDate: ActiveDate): void => emit("getDate", activeDate);

onMounted(() => getDate(active));

watch(active, a => getDate(a));
watch(props, p => reactivEvents = p.setEvents.map(event => reactive(event)));

/**
 * Changes the month value and emits the "changeMonth" event.
 * 
 * @param {Month} monthValue - The new month value.
 * @returns {void}
 */
function changeMonth(monthValue: Month): void {
  month.value = monthNumber(monthValue);
  canBeReseted.value = checkReset(year.value, month.value);

  return emit("changeMonth", monthValue);
}

/**
 * Changes the year value of the calendar.
 * 
 * @param {number} yearValue - The new year value.
 * @returns {void}
 * @emits changeYear - Emitted when the year value is changed.
 */
function changeYear(yearValue: number): void {
  year.value = yearValue;
  canBeReseted.value = checkReset(year.value, month.value);

  return emit("changeYear", yearValue);
}

/**
 * Decrements the year value by the specified amount.
 * Updates the `year` value and checks if the calendar can be reset.
 * Emits the "decrementYear" event with the decremented year value.
 *
 * @param decYear - The amount to decrement the year value by.
 * @returns {void}
 * @emits decrementYear - Emitted when the year value is decremented.
 */
function decrementYear(decYear: number): void {
  year.value = decYear;
  canBeReseted.value = checkReset(year.value, month.value);

  return emit("decrementYear", decYear);
}

/**
 * Increments the year value by the specified amount.
 * 
 * @param {number} incYear - The amount by which to increment the year.
 * @returns {void}
 * @emits decrementYear - Emitted when the year value is incremented.
 */
function incrementYear(incYear: number): void {
  year.value = incYear;
  canBeReseted.value = checkReset(year.value, month.value);

  return emit("incrementYear", incYear);
}

/**
 * Checks if the given year and month need to be reset.
 * 
 * @param {number} year - The year to check.
 * @param {number} month - The month to check.
 * @returns {boolean} - Returns true if the year and month need to be reset, false otherwise.
 */
function checkReset(year: number, month: number): boolean {
  return year === currentYear && month === currentMonth ? false : true;
}

/** Sets the date and shows the settings for the selected date. */
function setDate(): void {
  showSettings.forDate = true;
}

/**
 * Changes the first day of the week in the calendar.
 * 
 * @param {WeekFirstDay} firstDay - The new first day of the week.
 * @returns {void}
 * @emits changeFirstWeekDay - Event emitted when the first day of the week is changed.
 */
function changeFirstDayOfTheWeek(firstDay: WeekFirstDay): void {
  firstDayOfTheWeek.value = firstDay;

  return emit("changeFirstWeekDay", firstDay);
}

/** Shows the month settings. */
function showMonthSettings(): void {
  showSettings.forWeekDay = true;
}

/** Hides the settings for the week day and date in the calendar. */
function hideSettings(): void {
  showSettings.forWeekDay = false;
  showSettings.forDate = false;
}

/**
 * Activates a specific date in the calendar.
 * 
 * @param {number} date - The date to activate.
 * @param {Month} month - The month of the date to activate.
 * @param {number} year - The year of the date to activate.
 * @returns {void}
 */
function activateDate(date: number, month: Month, year: number): void {
  const mnt = monthNumber(month);

  active.month = mnt;
  active.year = year;
  active.date = date;
}

/**
 * Moves to the next month in the calendar.
 * Updates the `year` and `month` values accordingly.
 * Emits the "nextMonth" event with the updated year and month values.
 *
 * @returns {void}
 */
function nextMonth(): void {
  year.value = month.value === 12 ? year.value + 1 : year.value;
  month.value = month.value === 12 ? 1 : month.value + 1;
  canBeReseted.value = checkReset(year.value, month.value);

  return emit("nextMonth", { year: year.value, month: month.value });
}

/**
 * Decreases the month value and updates the year if necessary.
 * Emits the "prevMonth" event with the updated year and month values.
 *
 * @returns {void}
 */
function prevMonth(): void {
  year.value = month.value === 1 ? year.value - 1 : year.value;
  month.value = month.value === 1 ? 12 : month.value - 1;
  canBeReseted.value = checkReset(year.value, month.value);

  return emit("prevMonth", { year: year.value, month: month.value });
}

/**
 * Resets the month to the current year and month.
 * Emits a "resetMonth" event with the year and month values.
 */
function resetMonth(): void {
  year.value = currentYear;
  month.value = currentMonth;
  canBeReseted.value = false;

  return emit("resetMonth", { year: year.value, month: month.value });
}

/** Resets the active date to the current month, year, and date. */
function resetActiveDate(): void {
  active.month = currentMonth;
  active.year = currentYear;
  active.date = currentDate;
}
</script>

<template>
  <month-base>
    <template #header>
      <month-info :month="month" :year="year" @set-date="setDate" class="col-span-3" />
      <month-actions :canBeReseted="canBeReseted" @prev-month="prevMonth" @next-month="nextMonth" @reset-month="resetMonth" class="col-span-2" />
    </template>

    <template #default>
      <month-week :startDay="firstDayOfTheWeek" />
      <month-days :month="month" :year="year" :startDay="firstDayOfTheWeek" :activeDay="active" @activate-date="activateDate" :events="reactivEvents" />
    </template>

    <template #footer>
      <month-label :month="active.month" :year="active.year" :date="active.date" @reset-active-date="resetActiveDate" @show-month-settings="showMonthSettings" />
      <month-settings :month="month" :year="year" :startDay="firstDayOfTheWeek" :showSettings="showSettings" @change-month="changeMonth" @change-year="changeYear" @decrement-year="decrementYear" @increment-year="incrementYear" @hide-settings="hideSettings" @change-first-week-day="changeFirstDayOfTheWeek" />
    </template>
  </month-base>
</template>

<style>
@import "./custom-components.css";
</style>