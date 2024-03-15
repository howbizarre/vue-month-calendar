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
@tailwind base;
@tailwind utilities;
@tailwind components;
</style>