<template>
  <div class="month-grid">
    <div v-for="md in allDaysInMonth" class="text-center" :key="md.day + md.date + md.month + md.year">
      <button @click="$emit('activateDate', md.date, md.month, md.year)" class="calendar-day relative" :class="[isWeedend(md.day), isCurrent(md.date, md.month, md.year), isActive(md.date, md.month, md.year)]">
        {{ md.date }}
        <div class="absolute bottom-[5px] left-0 w-full text-center flex justify-center" v-events="md"></div>
      </button>
    </div>
  </div>
</template>

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

const allDaysInMonth = ref(fillMonth(month.value, year.value, startDay.value));

watch(
  () => [month.value, year.value, startDay.value],
  ([newMonth, newYear, newStartDay]) => {
    allDaysInMonth.value = fillMonth(Number(newMonth), Number(newYear), (newStartDay as WeekFirstDay));
  }
);

watch(props, a => reactivEvents = a.events.map(event => reactive(event)));
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

.calendar-day.current.active {
  @apply text-black dark:text-white;
}

.calendar-day.active {
    @apply bg-cyan-500/25;
}
</style>