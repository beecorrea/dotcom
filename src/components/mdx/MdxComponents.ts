/**
 * MDX component overrides for the blog's MDXProvider.
 *
 * This object maps MDX element names (e.g. 'h1', 'p', 'a', 'code') to custom
 * Vue components or HTML elements. When a key is provided, the MDXProvider will
 * render that element using the mapped component instead of the default.
 *
 * Currently empty — Tufte CSS's default element styling handles typography
 * beautifully. Add overrides here when custom rendering is needed, e.g.:
 *
 * ```ts
 * import CustomBlockquote from './CustomBlockquote.vue'
 *
 * export default {
 *   blockquote: CustomBlockquote,
 * } as const
 * ```
 */
const mdxComponents = {} as const

export default mdxComponents
