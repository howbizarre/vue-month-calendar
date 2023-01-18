<script setup lang="ts">
import VueMonthCalendar from "../lib/VueMonthCalendar.vue";

function getDate(activeDate: { month: number, year: number, date: number }) {
  console.group("The returned data is:");
  console.log("Day: ", activeDate.date);
  console.log("Month: ", activeDate.month);
  console.log("Yeaar: ", activeDate.year);
  console.groupEnd();
}
</script>

<template>
  <VueMonthCalendar @get-date="getDate" />
</template>

