<script setup lang="ts">
import VueMonthCalendar from "../lib/VueMonthCalendar.vue";
import { onMounted, ref } from "vue";

const isMounted = ref(false);

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();

/** For which dates of the month there are events */
const setEvents = [
  { date: 28, month: month, year: year },
  { date: 5, month: month + 1, year: year },
  { date: 5, month: month + 1, year: year },
  { date: 5, month: month + 1, year: year },
  { date: 14, month: month + 1, year: year },
  { date: 14, month: month + 1, year: year },
  { date: 10, month: month + 1, year: year },
  { date: 17, month: month + 1, year: year },
  { date: 22, month: month + 1, year: year },
  { date: 22, month: month + 1, year: year },
  { date: 23, month: month + 1, year: year },
  { date: 28, month: month + 1, year: year },
  { date: 1, month: month + 2, year: year },
  { date: 1, month: month + 2, year: year },
  { date: 3, month: month + 2, year: year }
];

onMounted(() => isMounted.value = true);

/**
 * Retrieves the date information from the active day.
 * @param {Object} activeDate - The active date object containing month, year, and date.
 */
function getDate(activeDate: { month: number, year: number, date: number }) {
  console.group("The returned data is:");
  console.log("Day: ", activeDate.date);
  console.log("Month: ", activeDate.month);
  console.log("Year: ", activeDate.year);
  console.groupEnd();
}

/**
 * Catches the change of year
 * @param {number} yearValue - The new year value.
 * @returns {void}
 */
function changeYear(yearValue: number): void {
  console.log("Change Year to: ", yearValue);
}

/**
 * Catches the change of the month value.
 * @param {number} monthValue - The new month value.
 * @returns {void}
 */
function changeMonth(monthValue: number): void {
  console.log("Change Month to: ", monthValue);
}

/**
 * Catches the decrement the year.
 * @param decYear The number of years to decrement.
 */
function decrementYear(decYear: number): void {
  console.log("Decrement Year: ", decYear);
}

/**
 * Catches the increment the year.
 * @param incYear The number of years to decrement.
 */
function incrementYear(incYear: number): void {
  console.log("Increment Year: ", incYear);
}

/**
 * Catches navigating to the next month.
 * @param nextMonth - The number representing the next month.
 */
function nextMonth(nextMonth: number): void {
  console.log("Next Month: ", nextMonth);
}

/**
 * Catches navigating to the previous month.
 * @param prevMonth - The number representing the next month.
 */
function prevMonth(prevMonth: number): void {
  console.log("Previous Month: ", prevMonth);
}

/**
 * Catches the reset of the month.
 * @param {number} resetMonth - The month to reset to.
 */
function resetMonth(resetMonth: number): void {
  console.log("Reset Month: ", resetMonth);
}

/**
 * Catches changes for the first weekday.
 * @param {number} firstWeekDay - The new first week day.
 */
function changeFirstWeekDay(firstWeekDay: number): void {
  console.log("Change First Week Day: ", firstWeekDay);
}
</script>

<template>
  <VueMonthCalendar v-if="isMounted"
                    @get-date="getDate"
                    @change-year="changeYear"
                    @change-month="changeMonth"
                    @decrement-year="decrementYear"
                    @increment-year="incrementYear"
                    @next-month="nextMonth"
                    @prev-month="prevMonth"
                    @reset-month="resetMonth"
                    @change-first-week-day="changeFirstWeekDay"
                    :setEvents="setEvents" />
</template>
