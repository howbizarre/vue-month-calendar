<script setup lang="ts">
import { monthName, addDays } from "typescript-calendar-date";
import VueMonthCalendar from "../lib/VueMonthCalendar.vue";
import { onMounted, ref } from "vue";

const isMounted = ref(false);

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();

const nameOfMonth = monthName(month + 1);

const setEvents = [
  { date: 28, month: month    , year: year },
  { date:  5, month: month + 1, year: year },
  { date:  5, month: month + 1, year: year },
  { date:  5, month: month + 1, year: year },
  { date: 14, month: month + 1, year: year },
  { date: 14, month: month + 1, year: year },
  { date: 10, month: month + 1, year: year },
  { date: 17, month: month + 1, year: year },
  { date: 22, month: month + 1, year: year },
  { date: 22, month: month + 1, year: year },
  { date: 23, month: month + 1, year: year },
  { date: 28, month: month + 1, year: year },
  { date:  1, month: month + 2, year: year },
  { date:  1, month: month + 2, year: year },
  { date:  3, month: month + 2, year: year }
];

onMounted(() => isMounted.value = true);

function getDate(activeDate: { month: number, year: number, date: number }) {
  console.group("The returned data is:");
  console.log("Day: ", activeDate.date);
  console.log("Month: ", activeDate.month);
  console.log("Yeaar: ", activeDate.year);
  console.groupEnd();
}

function changeYear(yearValue: number): void {
  console.log("Change Year to: ", yearValue);
}

function changeMonth(monthValue: number): void {
  console.log("Change Month to: ", monthValue);
}

function decrementYear(decYear: number): void {
  console.log("Decrement Year: ", decYear);
}

function incrementYear(incYear: number): void {
  console.log("Increment Year: ", incYear);
}

function nextMonth(nextMonth: number): void {
  console.log("Next Month: ", nextMonth);
}

function prevMonth(prevMonth: number): void {
  console.log("Previous Month: ", prevMonth);
}

function resetMonth(resetMonth: number): void {
  console.log("Reset Month: ", resetMonth);
}

function changeFirstWeekDay(firstWeekDay: number): void {
  console.log("Change First Week Day: ", firstWeekDay);
}
</script>

<template>
  <VueMonthCalendar
  v-if="isMounted"

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

