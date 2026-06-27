import type { Component, Ref } from 'vue'

/** Frontmatter metadata extracted from an MDX blog post. */
export interface PostMeta {
  title: string
  subtitle: string
  publishedAt: string
  slug: string
}

/** A fully resolved blog post: its metadata paired with the compiled MDX component. */
export interface Post {
  meta: PostMeta
  component: Component
}

/** A single tab item's metadata. */
export interface Tab {
  id: string
  label: string
}

/** The Injection Context for child tab panels to register and synchronize with parent tabs. */
export interface TabsContext {
  activeTabId: Ref<string>
  registerTab: (id: string, label: string) => void
}
