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
</script>

<template>
  <VueMonthCalendar @get-date="getDate" :setEvents="setEvents" />
</template>

