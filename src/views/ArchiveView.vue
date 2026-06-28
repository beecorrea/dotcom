<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useNotes } from '@/composables/useNotes'
import Navbar from '@/components/Navbar.vue'
import NoteCard from '@/components/NoteCard.vue'
import { SITE_DESCRIPTION } from '@/constants'

const { notes } = useNotes()

useHead({
  title: '@bianca — All Notes',
  meta: [
    {
      name: 'description',
      content: `A complete archive of notes on @bianca. ${SITE_DESCRIPTION}`,
    },
  ],
})
</script>

<template>
  <div class="reading-container">
    <Navbar />

    <header class="archive-header">
      <h1 class="archive-title">Writing</h1>
    </header>

    <section aria-label="All notes">
      <NoteCard
        v-for="note in notes"
        :key="note.meta.slug"
        :title="note.meta.title"
        :subtitle="note.meta.subtitle"
        :published-at="note.meta.publishedAt"
        :slug="note.meta.slug"
      />

      <p v-if="notes.length === 0" class="empty-state">
        No notes yet. Check back soon.
      </p>
    </section>
  </div>
</template>

<style scoped>
.archive-header {
  margin-block-end: 3rem;
}

.archive-title {
  font-family: var(--font-heading, 'Newsreader', serif);
  font-size: clamp(2rem, 1.5rem + 2vw, 3rem);
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.empty-state {
  color: var(--color-text-secondary);
  font-style: italic;
  line-height: 1.7;
}
</style>
