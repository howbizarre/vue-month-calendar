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

## Customize colors

You can customize the colors of the calendar by overriding the CSS variables.

```css
:root {
  --white: white;
  --black: black;

  --zinc-400: #a1a1aa;
  --zinc-600: #52525b;
  --zinc-600-25: #52525b25;
  --zinc-800: #27272a;
  --zinc-900: #18181b;
  --zinc-900-5: #18181b05;
  --zinc-900-50: #18181b50;

  --teal-400: #2dd4bf;
  --teal-500: #14b8a6;
  --teal-500-25: #14b8a625;
  --teal-600: #0891b2;
  --teal-600-50: #0891b250;
  --teal-700: #0e7490;
  --teal-800: #155e75;

  --sky-500: #0ea5e9;
  --sky-500-5: #0ea5e905;
  --sky-500-25: #0ea5e925;

  --blue-600: #2563eb;

  --container-sm-w: 350px;
}
```

The colors are with the names and values from Tailwindcss, and for transparency I use HEX with an alpha channel and added to the name of the var.
