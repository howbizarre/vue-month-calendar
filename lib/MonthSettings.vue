<template>
  <template v-if="showSettings.forWeekDay || showSettings.forDate">
    <div @click.self="hideSettings" class="animate-[dim-show_0.25s_ease-in-out_1] overflow-x-hidden overflow-y-auto fixed inset-0 z-[99] justify-center items-center flex">
      <div class="month-container w-[300px]">

        <template v-if="showSettings.forWeekDay">
          <h3 class="text-black dark:text-white">First day of the week is <strong class="text-teal-600 dark:text-teal-500">{{ firstWeekDay[0].toUpperCase() }}{{ firstWeekDay.slice(1) }}</strong></h3>
          <form class="flex flex-col">
            <label class="cursor-pointer text-black dark:text-white">
              <input type="radio" id="monday" value="monday" v-model="firstWeekDay" @change="changeFirstWeekDay" /> Monday
            </label>
            <label class="cursor-pointer text-black dark:text-white">
              <input type="radio" id="sunday" value="sunday" v-model="firstWeekDay" @change="changeFirstWeekDay" /> Sunday
            </label>
          </form>
        </template>

        <template v-if="showSettings.forDate">
          <div class="flex flex-row w-full rounded-full relative mb-5">
            <button @click="decrementYear" class="bg-teal-600 text-white hover:bg-teal-700 w-20 rounded-l-full cursor-pointer outline-none">
              <span class="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                  <path d="M384 265H128v-17h256v17z" fill="currentColor" />
                </svg>
              </span>              
            </button>

            <input @keyup="changeYear(thisYear)" type="number" v-model.number="thisYear" class="outline-none text-center w-full font-semibold text-md flex items-center bg-teal-600 text-white focus:bg-teal-700" />
            
            <button @click="incrementYear" class="bg-teal-600 text-white hover:bg-teal-700 w-20 rounded-r-full cursor-pointer">
              <span class="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                  <path d="M384 265H264v119h-17V265H128v-17h119V128h17v120h120v17z" fill="currentColor" />
                </svg>
              </span>
            </button>
          </div>

          <div class="grid grid-cols-3 gap-3 text-black dark:text-white">
            <button @click="changeMonth(month)" v-for="month in monthsInYear.short" class="btn text-[12px]" :class="{active: checkMonth(month)}">{{ month }}</button>
          </div>
        </template>

        <button @click="hideSettings" class="float-right mt-3 text-[10px] btn">close</button>
      </div>
    </div>
    <div class="opacity-50 fixed inset-0 z-[98] bg-black"></div>
  </template>
</template>

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

watch(props, () => {
  thisYear.value = props.year;
  thisMonth.value = props.month;
});

const emit = defineEmits(["hideSettings", "changeFirstWeekDay", "decrementYear", "incrementYear", "changeYear", "changeMonth"]);
const hideSettings = () => emit("hideSettings");

function checkMonth(mnt: string): boolean {
  return mnt === monthName(thisMonth.value);
}

function changeMonth(monthValue: string): void {
  emit("changeMonth", monthValue);
}

function changeYear(yearValue: number): void {
  emit("changeYear", yearValue);
}

function changeFirstWeekDay(): void {
  emit("changeFirstWeekDay", firstWeekDay.value);
}

function decrementYear(): void {
  thisYear.value -= 1;
  emit("decrementYear", thisYear.value);
}

function incrementYear(): void {
  thisYear.value += 1;
  emit("incrementYear", thisYear.value);
}
</script>

<style>
@keyframes dim-show {
  from { opacity: 0; }
  to { opacity: 1; }
}

.active { @apply bg-blue-700; }

/* Remove default arrows in input type number fields */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>