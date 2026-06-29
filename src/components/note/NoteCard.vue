<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { NoteMeta } from '@/types'

interface Props {
  title: NoteMeta['title']
  subtitle: NoteMeta['subtitle']
  publishedAt: NoteMeta['publishedAt']
  slug: NoteMeta['slug']
}

const props = defineProps<Props>()

/** Format the ISO date string into a human-readable long date (e.g. "June 15, 2026"). */
const formattedDate = computed(() =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(props.publishedAt)),
)
</script>

<template>
  <article class="note-card">
    <h2 class="note-card-title">
      <RouterLink :to="`/notes/${slug}`" class="note-card-link">
        {{ title }}
      </RouterLink>
    </h2>

    <time :datetime="publishedAt" class="note-card-date">
      {{ formattedDate }}
    </time>

    <p class="note-card-subtitle">{{ subtitle }}</p>
  </article>
</template>

<style scoped>
.note-card {
  position: relative;
  margin-block-end: 3rem;
  cursor: pointer;
}

.note-card::before {
  content: '';
  position: absolute;
  top: 0.25rem;
  bottom: 0.25rem;
  left: -1rem;
  width: 3px;
  background-color: var(--color-accent);
  opacity: 0;
  transform: scaleY(0.8);
  transform-origin: center;
  transition: opacity 0.23s ease, transform 0.20s ease;
  border-radius: 2px;
}

.note-card:hover::before {
  opacity: 1;
  transform: scaleY(1);
}

.note-card-date {
  display: block;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-block-end: 0.25rem;
  line-height: 1.7;
}

.note-card-title {
  font-family: var(--font-heading, 'Newsreader', serif);
  font-size: clamp(1.25rem, 1rem + 1vw, 1.75rem);
  font-weight: 500;
  line-height: 1.3;
  margin: 0;
  margin-block-end: 0.375rem;
  text-wrap: balance;
}

.note-card-link {
  color: var(--color-text);
  text-decoration: none;
}

.note-card-link::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
}

.note-card-subtitle {
  color: var(--color-text-secondary);
  font-size: clamp(1rem, 0.95rem + 0.2vw, 1.125rem);
  line-height: 1.7;
  text-wrap: pretty;
}
</style>
