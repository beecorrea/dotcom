import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeShiki from '@shikijs/rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { resolve } from 'node:path'
import { readdirSync } from 'node:fs'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    mdx({
      jsxImportSource: 'vue',
      providerImportSource: '@mdx-js/vue',
      remarkPlugins: [
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: 'frontmatter' }],
      ],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, {
          behavior: 'append',
          properties: {
            ariaLabel: 'Link to this section',
            className: ['heading-anchor'],
          },
          content: {
            type: 'text',
            value: '#',
          },
        }],
        [rehypeShiki, {
          themes: {
            light: 'rose-pine-dawn',
            dark: 'rose-pine-moon',
          },
        }],
      ],
    }),
    vue(),
  ],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    includedRoutes(paths) {
      const notesDir = resolve(__dirname, 'content/notes')
      try {
        const files = readdirSync(notesDir)
        const noteRoutes = files
          .filter(f => f.endsWith('.mdx'))
          .map(f => `/notes/${f.replace(/\.mdx$/, '')}`)
        
        return paths
          .filter(p => p !== '/notes/:slug')
          .concat(noteRoutes)
      } catch (e) {
        console.error('Error rendering static notes:', e)
        return paths
      }
    },
  },
})
