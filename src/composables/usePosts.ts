import { computed } from 'vue'
import type { Post, PostMeta } from '@/types'

// Import all MDX post files from /content/posts/
const postModules = import.meta.glob<true, string, { default: any; frontmatter: Omit<PostMeta, 'slug'> }>(
  '/content/posts/*.mdx',
  { eager: true }
)

const allPosts: Post[] = Object.entries(postModules).map(([path, module]) => {
  // Extract slug from filename (e.g. '/content/posts/hello-world.mdx' -> 'hello-world')
  const slug = path.split('/').pop()?.replace(/\.mdx$/, '') || ''
  
  const meta: PostMeta = {
    title: module.frontmatter.title || 'Untitled',
    subtitle: module.frontmatter.subtitle || '',
    publishedAt: module.frontmatter.publishedAt || new Date().toISOString().split('T')[0],
    slug,
  }

  return {
    meta,
    component: module.default,
  }
})

// Sort posts by publish date descending
const sortedPosts = [...allPosts].sort((a, b) => {
  const dateA = new Date(a.meta.publishedAt).getTime()
  const dateB = new Date(b.meta.publishedAt).getTime()
  return dateB - dateA
})

export function usePosts() {
  const posts = computed(() => sortedPosts)

  const getPostBySlug = (slug: string) => {
    return sortedPosts.find((post) => post.meta.slug === slug)
  }

  return {
    posts,
    getPostBySlug,
  }
}
