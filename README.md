# Vue Month Calendar

This simple UI component renders a month from a year. Sets a date as active and gave you the ability to change it.

At the beginning - the active date is the current date.

The component also **support Dark** or White **themes**.

## Demo

[https://bizarre.how/calendar/](https://bizarre.how/calendar/)

## Dependency

- [Vue 3](https://vuejs.org/)
- [Typescript Calendar Date](https://github.com/tskj/typescript-calendar-date)
- [Tailwindcss](https://tailwindcss.com/)

## Install

In to your Vue 3 project install as dependancy:

```sh
npm i @howbizarre/vue-month-calendar
```

## Usage

```javasciprt
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

<script setup lang="ts">
import { VueMonthCalendar } from "@howbizarre/vue-month-calendar";
import "@howbizarre/vue-month-calendar/dist/style.css";
import { ref, onMounted } from "vue";

const isMounted = ref(false);

const setEvents = [
  {
    date: 30,
    month: 1,
    year: 2023
  },
  {
    date: 5,
    month: 2,
    year: 2023
  },
  {
    date: 5,
    month: 2,
    year: 2023
  },
  {
    date: 5,
    month: 2,
    year: 2023
  },
  {
    date: 14,
    month: 2,
    year: 2023
  },
  {
    date: 14,
    month: 2,
    year: 2023
  },
  {
    date: 10,
    month: 2,
    year: 2023
  },
  {
    date: 17,
    month: 2,
    year: 2023
  },
  {
    date: 22,
    month: 2,
    year: 2023
  },
  {
    date: 22,
    month: 2,
    year: 2023
  },
  {
    date: 23,
    month: 2,
    year: 2023
  },
  {
    date: 28,
    month: 2,
    year: 2023
  },
  {
    date: 10,
    month: 3,
    year: 2023
  }
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

onMounted(() => isMounted.value = true);
</script>
```