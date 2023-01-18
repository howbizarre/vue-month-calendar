<template>
  <div class="month-container w-[366px]">
    <header>
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
    bg-white dark:bg-slate-800
    ring-1 ring-zinc-900/5 dark:ring-zinc-600/25
    shadow-xl dark:shadow-zinc-800
    rounded-lg p-5;
}

.month-grid {
    @apply grid grid-cols-7 gap-y-2;
}

.btn {
  @apply
    inline-block font-medium px-2 py-[3px]
    bg-teal-600 text-white hover:bg-teal-700 focus:bg-teal-700 active:bg-teal-800
    leading-relaxed uppercase rounded-full
    shadow-md active:shadow-lg hover:shadow-lg focus:shadow-lg
    focus:outline-none focus:ring-0 transition duration-150 ease-in-out;
}
</style>