<template>
  <div class="month-container">
    <header class="month-header">
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style>
.month-container {
  @apply 
    bg-white dark:bg-zinc-800
    ring-1 ring-zinc-900/5 dark:ring-zinc-600/25
    shadow-xl dark:shadow-zinc-800
    rounded-lg p-3 max-[300px]:w-[300px] max-sm:w-full sm:w-[350px] relative;
}

.month-grid { @apply grid grid-cols-7 gap-y-2 py-3; }

.month-header { @apply grid grid-cols-5 p-3; }

.btn-month-base {
  @apply
    inline-block font-medium px-2 py-[3px]
    bg-teal-600 text-white hover:bg-teal-700 focus:bg-teal-700 active:bg-teal-800
    leading-relaxed uppercase text-[10px]
    shadow-md active:shadow-lg hover:shadow-lg focus:shadow-lg
    focus:outline-none focus:ring-0 transition duration-150 ease-in-out;
}

.btn-full-rouded { @apply rounded-full; }
</style>