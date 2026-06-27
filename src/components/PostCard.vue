<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { PostMeta } from '@/types'

interface Props {
  title: PostMeta['title']
  subtitle: PostMeta['subtitle']
  publishedAt: PostMeta['publishedAt']
  slug: PostMeta['slug']
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
  <article class="post-card">
    <h2 class="post-card-title">
      <RouterLink :to="`/posts/${slug}`" class="post-card-link">
        {{ title }}
      </RouterLink>
    </h2>

    <time :datetime="publishedAt" class="post-card-date">
      {{ formattedDate }}
    </time>

    <p class="post-card-subtitle">{{ subtitle }}</p>
  </article>
</template>

<style scoped>
.post-card {
  position: relative;
  margin-block-end: 3rem;
  cursor: pointer;
}

.post-card::before {
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

.post-card:hover::before {
  opacity: 1;
  transform: scaleY(1);
}

.post-card-date {
  display: block;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-block-end: 0.25rem;
  line-height: 1.7;
}

.post-card-title {
  font-family: var(--font-heading, 'Newsreader', serif);
  font-size: clamp(1.25rem, 1rem + 1vw, 1.75rem);
  font-weight: 500;
  line-height: 1.3;
  margin: 0;
  margin-block-end: 0.375rem;
  text-wrap: balance;
}

.post-card-link {
  color: var(--color-text);
  text-decoration: none;
}

.post-card-link::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
}

.post-card-subtitle {
  color: var(--color-text-secondary);
  font-size: clamp(0.9375rem, 0.5rem + 0.8vw, 1.0625rem);
  line-height: 1.7;
  text-wrap: pretty;
}
</style>
