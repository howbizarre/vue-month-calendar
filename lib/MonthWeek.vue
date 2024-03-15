<script lang="ts" setup>
import { watch, ref } from "vue";
import { weekDays, type WeekFirstDay } from "./date-processing";

const props = defineProps<{
  startDay: WeekFirstDay;
}>();

const daysInWeek = ref(weekDays[props.startDay]);

watch(
  () => props.startDay,
  (startDay) => {
    daysInWeek.value = weekDays[startDay];
  }
);
</script>

<template>
  <div class="month-grid">
    <div v-for="day, i in daysInWeek.short" :key="i">
      <span class="week-day mx-auto" :class="{ 'weekend': day === 'sat' || day === 'sun' }" :title="daysInWeek.long[i]">
        {{ day[0].toUpperCase() }}
      </span>
    </div>
  </div>
</template>