<script setup lang="ts">
import { computed } from 'vue'
import type { NoteMeta } from '@/types'

interface Props {
  title: NoteMeta['title']
  subtitle: NoteMeta['subtitle']
  publishedAt: NoteMeta['publishedAt']
}

const props = defineProps<Props>()

/** Format the ISO date string into a human-readable long date (e.g. "June 15, 2026"). */
const formattedDate = computed(() =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(props.publishedAt)),
)
</script>

<template>
  <header class="note-header">
    <h1 class="note-header-title">{{ title }}</h1>
    <p class="note-header-subtitle">{{ subtitle }}</p>

    <time :datetime="publishedAt" class="note-header-date">
      {{ formattedDate }}
    </time>

    <hr class="note-header-divider" />
  </header>
</template>

<style scoped>
.note-header {
  margin-block-end: 2.5rem;
}

.note-header-title {
  font-family: var(--font-heading, 'Newsreader', serif);
  font-size: clamp(2rem, 1.5rem + 2vw, 3rem);
  font-weight: 600;
  line-height: 1.2;
  color: var(--color-text);
  margin: 0;
  margin-block-end: 0.75rem;
  text-wrap: balance;
}

.note-header-subtitle {
  font-size: clamp(1.0625rem, 0.75rem + 0.8vw, 1.25rem);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
  margin-block-end: 1rem;
  text-wrap: pretty;
}

.note-header-date {
  display: block;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-block-end: 1.5rem;
}

.note-header-divider {
  border: none;
  border-block-start: 1px solid var(--color-gold);
  margin: 0;
}
</style>
