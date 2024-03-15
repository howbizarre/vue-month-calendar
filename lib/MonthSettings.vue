<script lang="ts" setup>
import { ref, watch } from "vue";
import { monthsInYear } from "./date-processing";
import { monthName } from "typescript-calendar-date";
import type { WeekFirstDay } from "./date-processing";

const props = defineProps<{
  startDay: WeekFirstDay;
  month: number;
  year: number;
  showSettings: {
    "forWeekDay": boolean,
    "forDate": boolean
  };
}>();

const firstWeekDay = ref(props.startDay);
const thisYear = ref(props.year);
const thisMonth = ref(props.month);

watch(
  () => [props.month, props.year],
  ([newMonth, newYear]) => {
    thisMonth.value = newMonth;
    thisYear.value = newYear;
  }
);

const emit = defineEmits(["hideSettings", "changeFirstWeekDay", "decrementYear", "incrementYear", "changeYear", "changeMonth"]);
const hideSettings = () => emit("hideSettings");

/**
 * Checks if the given month matches the current month.
 * @param {string} mnt - The month to check.
 * @returns {boolean} - True if the given month matches the current month, false otherwise.
 */
function checkMonth(mnt: string): boolean {
  return mnt === monthName(thisMonth.value);
}

/**
 * Changes the month value and emits the "changeMonth" event.
 * @param {string} monthValue - The new month value.
 */
function changeMonth(monthValue: string): void {
  checkMonth(monthValue);
  emit("changeMonth", monthValue);
}

/**
 * Changes the year value and emits the "changeYear" event.
 * @param {number} yearValue - The new year value.
 */
function changeYear(yearValue: number): void {
  emit("changeYear", yearValue);
}

/** Emits the "changeFirstWeekDay" event with the value of the firstWeekDay variable. */
function changeFirstWeekDay(): void {
  emit("changeFirstWeekDay", firstWeekDay.value);
}

/** Decrements the current year value by 1 and emits the "decrementYear" event. */
function decrementYear(): void {
  thisYear.value -= 1;
  emit("decrementYear", thisYear.value);
}

/** Increments the year value and emits the "incrementYear" event. */
function incrementYear(): void {
  thisYear.value += 1;
  emit("incrementYear", thisYear.value);
}
</script>

<template>
  <template v-if="showSettings.forWeekDay || showSettings.forDate">
    <div class="month-settings-dialog">
      <template v-if="showSettings.forWeekDay">
        <h3 class="rw-colors text-left">First day of the week is <strong>{{ firstWeekDay[0].toUpperCase() }}{{ firstWeekDay.slice(1) }}</strong></h3>
        <form class="start-day">
          <label class="rw-colors cursor-pointer">
            <input type="radio" id="monday" value="monday" v-model="firstWeekDay" @change="changeFirstWeekDay" /> Monday
          </label>
          <label class="rw-colors cursor-pointer">
            <input type="radio" id="sunday" value="sunday" v-model="firstWeekDay" @change="changeFirstWeekDay" /> Sunday
          </label>
        </form>
      </template>

      <template v-if="showSettings.forDate">
        <div class="year-action">
          <button @click="decrementYear" class="year-level year-level-left">
            <span class="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                <path d="M384 265H128v-17h256v17z" fill="currentColor" />
              </svg>
            </span>
          </button>

          <input @keyup="changeYear(thisYear)" type="number" v-model.number="thisYear" class="year-level year-level-center" />

          <button @click="incrementYear" class="year-level year-level-right">
            <span class="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                <path d="M384 265H264v119h-17V265H128v-17h119V128h17v120h120v17z" fill="currentColor" />
              </svg>
            </span>
          </button>
        </div>

        <div class="months-actions">
          <button v-for="month in monthsInYear.short" @click="changeMonth(month)" class="month-action btn-month-base btn-full-rounded" :class="{ active: checkMonth(month) }">{{ month }}</button>
        </div>
      </template>

      <button @click="hideSettings" class="close-settings btn-month-base btn-full-rounded">close</button>
    </div>

    <div class="bg-wrap" @click.self="hideSettings"></div>
  </template>
</template>