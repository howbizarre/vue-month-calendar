<template>
  <div class="month-grid">
    <div v-for="md in allDaysInMonth" class="text-center" :key="md.day + md.date + md.month + md.year">
      <button @click="$emit('activateDate', md.date, md.month, md.year)" class="calendar-day" :class="[isWeedend(md.day), isCurrent(md.date, md.month, md.year), isActive(md.date, md.month, md.year)]">
        {{ md.date }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { fillMonth } from "./date-processing";
import { monthNumber, monthName } from "typescript-calendar-date";

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
}>();

const dateObject = new Date();
const currentMonth = dateObject.getMonth() + 1;
const currentYear = dateObject.getFullYear();
const currentDate = dateObject.getDate();

const isWeedend = (day: string): string => {
  return day === "sat" || day === "sun" ? "weekend weekday" : "weekday";
}

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

const allDaysInMonth = ref(fillMonth(props.month, props.year, props.startDay));

watch(props, () => {
  allDaysInMonth.value = fillMonth(props.month, props.year, props.startDay);
});
</script>

<style>
.calendar-day {
  @apply
    w-[42px] h-[42px]
    text-center rounded-full border-none
    transition-colors text-zinc-400 hover:bg-cyan-500/25;
}

.calendar-day.weekend {
    @apply bg-sky-500/5 text-teal-600 hover:bg-cyan-500/25;
}

.calendar-day.current {
    @apply !bg-teal-500/25;
}

.calendar-day.active {
    @apply bg-cyan-500/25;
}
</style>