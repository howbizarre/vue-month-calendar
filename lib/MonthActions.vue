<script lang="ts" setup>
defineProps<{ canBeReseted: boolean; }>();

const emit = defineEmits(["prevMonth", "resetMonth", "nextMonth"]);

const prevMonth = () => emit("prevMonth");
const resetMonth = () => emit("resetMonth");
const nextMonth = () => emit("nextMonth");
</script>

<template>
  <div class="month-actions">
    <button @click="prevMonth" aria-label="Got to the previous month">
      <svg width="24" height="24" viewBox="0 0 24 24" class="action-icon">
        <g id="evaArrowIosBackOutline0">
          <g id="evaArrowIosBackOutline1">
            <path id="evaArrowIosBackOutline2" fill="currentColor" d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64Z" />
          </g>
        </g>
      </svg>
    </button>

    <button @click="resetMonth" v-if="canBeReseted" aria-label="Reset to current month">
      <svg width="24" height="24" viewBox="0 0 24 24" class="action-icon">
        <path fill="currentColor" d="M8.3 19.3q-.275-.275-.275-.7q0-.425.275-.7l1.1-1.1q-3.2-.425-5.3-1.75Q2 13.725 2 12q0-2.075 2.888-3.538Q7.775 7 12 7t7.113 1.462Q22 9.925 22 12q0 1.35-1.3 2.475t-3.475 1.8q-.5.15-.862-.125q-.363-.275-.363-.825q0-.3.212-.587q.213-.288.513-.388q1.575-.5 2.425-1.175Q20 12.5 20 12q0-.8-2.137-1.9Q15.725 9 12 9q-3.725 0-5.862 1.1Q4 11.2 4 12q0 .6 1.275 1.438Q6.55 14.275 8.9 14.7l-.6-.6q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l2.6 2.6q.15.15.213.325q.062.175.062.375t-.062.375q-.063.175-.213.325l-2.6 2.6q-.275.275-.7.275q-.425 0-.7-.275Z" />
      </svg>
    </button>

    <button @click="nextMonth" aria-label="Got to the next month">
      <svg width="24" height="24" viewBox="0 0 24 24" class="action-icon">
        <g id="evaArrowIosForwardOutline0">
          <g id="evaArrowIosForwardOutline1">
            <path id="evaArrowIosForwardOutline2" fill="currentColor" d="M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19Z" />
          </g>
        </g>
      </svg>
    </button>
  </div>
</template>