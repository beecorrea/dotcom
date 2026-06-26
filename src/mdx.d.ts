declare module '*.mdx' {
  import type { DefineComponent } from 'vue'

  /** MDX frontmatter exported as a named export */
  export const frontmatter: Record<string, unknown>

  /** The MDX content as a Vue component */
  const component: DefineComponent<object, object, unknown>
  export default component
}
