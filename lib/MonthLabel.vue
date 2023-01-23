
<template>
  <div class="info-bottom">
    <div class="info-bottom-part">
      <strong>{{ date }} {{ nameOfMonth }} {{ year }}</strong>

      <button @click="resetActiveDate" class="btn btn-full-rouded ml-2" v-if="resetDate">
        today
      </button>
    </div>

    <div class="info-bottom-part">
      <button class="mr-2" @click="showMonthSettings">
        <svg width="20" height="20" viewBox="0 0 36 36">
          <path fill="currentColor" d="m32.57 15.72l-3.35-1a11.65 11.65 0 0 0-.95-2.33l1.64-3.07a.61.61 0 0 0-.11-.72l-2.39-2.4a.61.61 0 0 0-.72-.11l-3.05 1.63a11.62 11.62 0 0 0-2.36-1l-1-3.31a.61.61 0 0 0-.59-.41h-3.38a.61.61 0 0 0-.58.43l-1 3.3a11.63 11.63 0 0 0-2.38 1l-3-1.62a.61.61 0 0 0-.72.11L6.2 8.59a.61.61 0 0 0-.11.72l1.62 3a11.63 11.63 0 0 0-1 2.37l-3.31 1a.61.61 0 0 0-.43.58v3.38a.61.61 0 0 0 .43.58l3.33 1a11.62 11.62 0 0 0 1 2.33l-1.64 3.14a.61.61 0 0 0 .11.72l2.39 2.39a.61.61 0 0 0 .72.11l3.09-1.65a11.65 11.65 0 0 0 2.3.94l1 3.37a.61.61 0 0 0 .58.43h3.38a.61.61 0 0 0 .58-.43l1-3.38a11.63 11.63 0 0 0 2.28-.94l3.11 1.66a.61.61 0 0 0 .72-.11l2.39-2.39a.61.61 0 0 0 .11-.72l-1.66-3.1a11.63 11.63 0 0 0 .95-2.29l3.37-1a.61.61 0 0 0 .43-.58v-3.41a.61.61 0 0 0-.37-.59ZM18 23.5a5.5 5.5 0 1 1 5.5-5.5a5.5 5.5 0 0 1-5.5 5.5Z" class="clr-i-solid clr-i-solid-path-1" />
          <path fill="none" d="M0 0h36v36H0z" />
        </svg>
      </button>

      <a href="https://github.com/howbizarre/month-calendar" title="Vue 3 with Typescript Calendar and Tailwindcss">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="flex-shrink-0 h-5 w-5" style="" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 2.247a10 10 0 0 0-3.162 19.487c.5.088.687-.212.687-.475c0-.237-.012-1.025-.012-1.862c-2.513.462-3.163-.613-3.363-1.175a3.636 3.636 0 0 0-1.025-1.413c-.35-.187-.85-.65-.013-.662a2.001 2.001 0 0 1 1.538 1.025a2.137 2.137 0 0 0 2.912.825a2.104 2.104 0 0 1 .638-1.338c-2.225-.25-4.55-1.112-4.55-4.937a3.892 3.892 0 0 1 1.025-2.688a3.594 3.594 0 0 1 .1-2.65s.837-.262 2.75 1.025a9.427 9.427 0 0 1 5 0c1.912-1.3 2.75-1.025 2.75-1.025a3.593 3.593 0 0 1 .1 2.65a3.869 3.869 0 0 1 1.025 2.688c0 3.837-2.338 4.687-4.563 4.937a2.368 2.368 0 0 1 .675 1.85c0 1.338-.012 2.413-.012 2.75c0 .263.187.575.687.475A10.005 10.005 0 0 0 12 2.247Z"></path>
        </svg>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { monthName } from "typescript-calendar-date";

const props = defineProps<{
  month: number;
  year: number;
  date: number;
}>();

const emit = defineEmits(["resetActiveDate", "showMonthSettings"]);
const resetActiveDate = () =>  emit("resetActiveDate");
const showMonthSettings = () => emit("showMonthSettings");

const dateObject = new Date();
const current = {
  month: dateObject.getMonth() + 1,
  year: dateObject.getFullYear(),
  date: dateObject.getDate()
}

const resetDate = ref(JSON.stringify(props) !== JSON.stringify(current));
const nameOfMonth = ref(monthName(props.month)[0].toUpperCase() + monthName(props.month).slice(1));

watch(props, () => {
  resetDate.value = JSON.stringify(props) !== JSON.stringify(current);
  nameOfMonth.value = monthName(props.month)[0].toUpperCase() + monthName(props.month).slice(1);
});
</script>

<style>
.info-bottom {
  @apply
    flex justify-between
    items-center p-3
    text-teal-600;
}

.info-bottom-part { @apply flex items-start justify-start; }
</style>