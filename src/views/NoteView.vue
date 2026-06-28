<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import { MDXProvider } from '@mdx-js/vue'
import { useNotes } from '@/composables/useNotes'
import Navbar from '@/components/Navbar.vue'
import NoteHeader from '@/components/note/NoteHeader.vue'
import mdxComponents from '@/components/mdx/MdxComponents'
import { SITE_DESCRIPTION } from '@/constants'

const route = useRoute()
const { getNoteBySlug } = useNotes()

const slug = computed(() => route.params.slug as string)
const note = computed(() => getNoteBySlug(slug.value))

// Dynamically set head metadata
useHead({
  title: computed(() => (note.value ? `@bianca — ${note.value.meta.title}` : '@bianca — Note Not Found')),
  meta: [
    {
      name: 'description',
      content: computed(() => note.value?.meta.subtitle || `${SITE_DESCRIPTION} — Note on @bianca`),
    },
  ],
})
</script>

<template>
  <div class="reading-container">
    <Navbar />

    <div v-if="note">
      <article>
        <NoteHeader
          :title="note.meta.title"
          :subtitle="note.meta.subtitle"
          :published-at="note.meta.publishedAt"
        />
        <div class="note-content">
          <MDXProvider :components="mdxComponents">
            <component :is="note.component" />
          </MDXProvider>
        </div>
      </article>
    </div>
    
    <div v-else class="not-found">
      <h1>Note Not Found</h1>
      <p>The note you are looking for could not be found. It may have been moved or deleted.</p>
      <RouterLink to="/" class="back-link">Return to Home</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding-block: 4rem;
}

.not-found h1 {
  font-family: var(--font-heading, 'Newsreader', serif);
  font-size: 2.5rem;
  margin-block-end: 1rem;
}

.not-found p {
  color: var(--color-text-secondary);
  margin-block-end: 2rem;
}

.back-link {
  font-weight: 500;
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.back-link:hover {
  color: var(--color-accent-hover);
}

/* Note-specific spacing/formatting adjustments */
.note-content {
  margin-block-start: 1rem;
}

/* Custom styles for Tufte elements inside note-content if needed */
:deep(pre) {
  margin-block: 1.5rem;
  padding: 1rem;
  border-radius: 0.375rem;
  overflow-x: auto;
  font-size: 0.9em;
  background-color: var(--color-code-bg);
  border: 1px solid var(--color-border);
}

:deep(code) {
  font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
}

:deep(:not(pre) > code) {
  padding-inline: 0.25rem;
  padding-block: 0.125rem;
  border-radius: 0.25rem;
  background-color: var(--color-code-bg);
  font-size: 0.9em;
  border: 1px solid var(--color-border);
}
</style>
