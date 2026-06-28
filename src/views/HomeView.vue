<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useNotes } from '@/composables/useNotes'
import Navbar from '@/components/navbar/Navbar.vue'
import NoteCard from '@/components/note/NoteCard.vue'

import { SITE_DESCRIPTION } from '@/constants'

const { notes } = useNotes()

const visibleNotes = computed(() => notes.value.filter((note) => !note.hide))

// Only show the 2 most recent notes on the homepage
const recentNotes = computed(() => visibleNotes.value.slice(0, 2))

useHead({
  title: '@bianca',
  meta: [
    {
      name: 'description',
      content: SITE_DESCRIPTION,
    },
  ],
})
</script>

<template>
  <div class="reading-container">
    <Navbar />

    <header class="home-hero">
      <h1 class="blog-focus">
        {{ SITE_DESCRIPTION }}
      </h1>
    </header>

    <section aria-label="Blog notes">
      <NoteCard
        v-for="note in recentNotes"
        :key="note.meta.slug"
        :title="note.meta.title"
        :subtitle="note.meta.subtitle"
        :published-at="note.meta.publishedAt"
        :slug="note.meta.slug"
      />

      <p v-if="visibleNotes.length === 0" class="empty-state">
        No notes yet. Check back soon.
      </p>

      <div v-if="visibleNotes.length > 0" class="archive-link-container">
        <RouterLink to="/notes" class="archive-link">
          All notes &rarr;
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-hero {
  margin-block-start: 1rem;
  margin-block-end: 3.5rem;
}

.blog-focus {
  font-family: var(--font-heading, 'Newsreader', serif);
  font-size: clamp(2.25rem, 1.75rem + 2.5vw, 3.5rem);
  font-weight: 500;
  line-height: 1.15;
  color: var(--color-text);
  margin: 0;
  text-wrap: pretty;
  letter-spacing: -0.02em;
}

.empty-state {
  color: var(--color-text-secondary);
  font-style: italic;
  line-height: 1.7;
}

.archive-link-container {
  margin-block-start: 3rem;
  margin-block-end: 2rem;
}

.archive-link {
  font-family: var(--font-ui, 'Inter', sans-serif);
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-accent);
  text-decoration: none;
  transition: color 0.2s ease;
}

.archive-link:hover {
  color: var(--color-accent-hover);
  text-decoration: underline;
  text-underline-offset: 0.25em;
}
</style>
