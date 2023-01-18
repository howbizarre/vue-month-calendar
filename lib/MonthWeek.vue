<template>
  <div class="month-grid py-3">
    <div v-for="day, i in daysInWeek.short" :key="i">
      <span class="week-day mx-auto" :class="{ 'weekend': day === 'sat' || day === 'sun' }" :title="daysInWeek.long[i]">
        {{ day[0].toUpperCase() }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { weekDays, type WeekFirstDay } from "./date-processing";

const props = defineProps<{
  startDay: WeekFirstDay;
}>();

const daysInWeek = weekDays[props.startDay];
</script>

<style>
.week-day {
  @apply
    w-[42px] h-[42px] rounded-full
    flex items-center justify-center
    capitalize text-center font-bold text-teal-600;
}

.week-day.weekend {
  @apply bg-sky-500/5;
}
</style>