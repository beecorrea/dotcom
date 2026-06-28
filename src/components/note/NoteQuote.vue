<template>
  <div class="note-quote">
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * NoteQuote
 * A custom blockquote component with a rose gold background highlight matching the theme.
 */
</script>

<style scoped>
.note-quote {
  border-inline-start: 4px solid var(--color-accent);
  padding-inline: 1.5rem 1.25rem;
  padding-block: 1rem;
  margin-block: 2rem;
  margin-inline: 0;
  background-color: var(--color-bg-subtle);
  color: var(--color-text-secondary);
  font-style: italic;
  border-radius: 0 0.5rem 0.5rem 0;
  text-wrap: pretty;
}

.note-quote :deep(p) {
  margin: 0;
}

.note-quote :deep(p:not(:last-child)) {
  margin-bottom: 0.75rem;
}
</style>
