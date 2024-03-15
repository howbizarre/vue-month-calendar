<script lang="ts" setup>
import { ref, watch, toRefs, reactive } from "vue";
import { fillMonth } from "./date-processing";
import { monthNumber, monthName } from "typescript-calendar-date";
import type { Directive } from 'vue';

import type { WeekFirstDay, Month } from "./date-processing";

type activeDay = {
  month: number;
  year: number;
  date: number;
};

const props = defineProps<{
  startDay: WeekFirstDay;
  month: number;
  year: number;
  activeDay?: activeDay;
  events: {
    date: number;
    month: number;
    year: number;
  }[];
}>();

const { startDay, month, year } = toRefs(props);
let reactivEvents = props.events.map(event => reactive(event));

/**
 * Directive to display events on a specific date in the month calendar.
 * @directive vEvents
 * @param {HTMLElement} el - The element to mount the directive on.
 * @param {Object} binding - The binding object containing the value for the directive.
 * @param {string} binding.value.date - The date of the event.
 * @param {string} binding.value.month - The month of the event.
 * @param {string} binding.value.year - The year of the event.
 */
const vEvents: Directive = {
  mounted: (el: HTMLElement, binding: any) => {
    const eventCount = ref("");

    reactivEvents.forEach((ev) => {
      if (ev.date === binding.value.date && monthName(ev.month) === binding.value.month && ev.year === binding.value.year) {
        eventCount.value = eventCount.value + "<i class='w-[5px] h-[5px] rounded-full bg-lime-500 mx-[1px]'></i>";
      }
    });

    el.innerHTML = eventCount.value;
  }
};

const dateObject = new Date();
const currentMonth = dateObject.getMonth() + 1;
const currentYear = dateObject.getFullYear();
const currentDate = dateObject.getDate();

/**
 * Determines if a given day is a weekend or weekday.
 * @param {string} day - The day to check.
 * @returns {string} - The CSS class name for the day.
 */
const isWeekend = (day: string): string => {
  return day === "sat" || day === "sun" ? "weekend weekday" : "weekday";
}

/**
 * Determines if a given date is the current date.
 * @param {number} date - The date to check.
 * @param {Month} month - The month of the date.
 * @param {number} year - The year of the date.
 * @returns {string} - A string indicating if the date is the current date ("current") or an empty string ("") if it is not.
 */
const isCurrent = (date: number, month: Month, year: number): string => {
  const mnt = monthNumber(month);

  if (year !== currentYear) {
    return "";
  }

  if (mnt !== currentMonth) {
    return "";
  }

  return `${date}${mnt}${year}` === `${currentDate}${currentMonth}${currentYear}` ? "current" : "";
}

/**
 * Determines if a given date is active based on the provided active day.
 * @param {number} date - The date to check.
 * @param {Month} month - The month of the date.
 * @param {number} year - The year of the date.
 * @returns {string} - Returns "active" if the date is active, otherwise an empty string.
 */
const isActive = (date: number, month: Month, year: number): string => {
  const yr = props?.activeDay && props.activeDay.year;
  const mnt = props?.activeDay && props.activeDay.month;
  const dt = props?.activeDay && props.activeDay.date;

  const m = mnt && monthName(mnt);

  if (!yr || year !== yr) {
    return "";
  }

  if (!mnt || m !== month) {
    return "";
  }

  return `${date}${month}${year}` === `${dt}${m}${yr}` ? "active" : "";
};

const allDaysInMonth = ref(fillMonth(month.value, year.value, startDay.value));

watch(
  () => [month.value, year.value, startDay.value],
  ([newMonth, newYear, newStartDay]) => {
    allDaysInMonth.value = fillMonth(Number(newMonth), Number(newYear), (newStartDay as WeekFirstDay));
  }
);

watch(props.events, pe => reactivEvents = pe.map(event => reactive(event)));
</script>

<template>
  <div class="month-grid">
    <div v-for="md in allDaysInMonth" class="text-center" :key="md.day + md.date + md.month + md.year">
      <button @click="$emit('activateDate', md.date, md.month, md.year)" class="calendar-day relative" :class="[isWeekend(md.day), isCurrent(md.date, md.month, md.year), isActive(md.date, md.month, md.year)]" :aria-label="`Day: ${md.date}, Month: ${md.month}, Year: ${md.year}`">
        {{ md.date }}
        <div class="day-events" v-events="md"></div>
      </button>
    </div>
  </div>
</template>