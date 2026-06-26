import type { Component } from 'vue'

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
