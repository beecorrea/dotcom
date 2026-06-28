import { computed } from 'vue'
import type { Note, NoteMeta } from '@/types'

// Import all MDX note files from /content/notes/
const noteModules = import.meta.glob<true, string, { default: any; frontmatter: Omit<NoteMeta, 'slug'> }>(
  '/content/notes/*.mdx',
  { eager: true }
)

const allNotes: Note[] = Object.entries(noteModules).map(([path, module]) => {
  // Extract slug from filename (e.g. '/content/notes/hello-world.mdx' -> 'hello-world')
  const slug = path.split('/').pop()?.replace(/\.mdx$/, '') || ''
  
  const meta: NoteMeta = {
    title: module.frontmatter.title || 'Untitled',
    subtitle: module.frontmatter.subtitle || '',
    publishedAt: module.frontmatter.publishedAt || new Date().toISOString().split('T')[0],
    slug,
    hide: module.frontmatter.hide,
  }

  return {
    meta,
    component: module.default,
    hide: module.frontmatter.hide,
  }
})

// Sort notes by publish date descending
const sortedNotes = [...allNotes].sort((a, b) => {
  const dateA = new Date(a.meta.publishedAt).getTime()
  const dateB = new Date(b.meta.publishedAt).getTime()
  return dateB - dateA
})

export function useNotes() {
  const notes = computed(() => sortedNotes)

  const getNoteBySlug = (slug: string) => {
    return sortedNotes.find((note) => note.meta.slug === slug)
  }

  return {
    notes,
    getNoteBySlug,
  }
}
