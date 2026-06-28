<template>
  <span class="brand-handle">@bianca</span>
</template>

<style scoped>
.brand-handle {
  font-family: var(--font-ui, 'Inter', sans-serif);
  font-weight: 600;
  color: var(--color-handle-text);
  background-color: var(--color-handle-bg);
  padding: 0.15em 0.35em;
  border-radius: 0.3em;
  display: inline-block;
  transition: background-color 0.2s ease, color 0.2s ease;
}

/* Highlight background on hover of the badge or parent link */
.brand-handle:hover,
:deep(a:hover) .brand-handle {
  background-color: var(--color-handle-bg-hover);
}
</style>
