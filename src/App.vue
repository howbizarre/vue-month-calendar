<script setup lang="ts">
import { monthName, addDays } from "typescript-calendar-date";
import VueMonthCalendar from "../lib/VueMonthCalendar.vue";

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();

const nameOfMonth = monthName(month + 1);

const setEvents = [
  { date: 28, month: 2, year: 2023, note: "Event Info" },
  { date: 5,  month: 3, year: 2023, note: "Event Info" },
  { date: 5,  month: 3, year: 2023, note: "Event Info" },
  { date: 5,  month: 3, year: 2023, note: "Event Info" },
  { date: 14, month: 3, year: 2023, note: "Event Info" },
  { date: 14, month: 3, year: 2023, note: "Event Info" },
  { date: 15, month: 3, year: 2023, note: "Event Info" },
  { date: 17, month: 3, year: 2023, note: "Event Info" },
  { date: 22, month: 3, year: 2023, note: "Event Info" },
  { date: 22, month: 3, year: 2023, note: "Event Info" },
  { date: 23, month: 3, year: 2023, note: "Event Info" },
  { date: 28, month: 3, year: 2023, note: "Event Info" },
  { date: 10, month: 4, year: 2023, note: "Event Info" }
];

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

