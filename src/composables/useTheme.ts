import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Ref, ComputedRef } from 'vue'

const STORAGE_KEY = 'handle-theme'

export function useTheme() {
  const isDark: Ref<boolean> = ref(false)

  const theme: ComputedRef<'light' | 'dark'> = computed(() =>
    isDark.value ? 'dark' : 'light',
  )

  /** Reference to the system colour-scheme media query. */
  let mediaQuery: MediaQueryList | null = null

  /** Whether the user has an explicit localStorage override. */
  let hasOverride = false

  /** Handler for system preference changes — only active when no override. */
  function handleSystemChange(event: MediaQueryListEvent) {
    if (hasOverride) return
    isDark.value = event.matches
    applyTheme()
  }

  /** Applies the current theme to the document root. */
  function applyTheme() {
    if (typeof window === 'undefined') return
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  /** Toggles between light and dark, persists the choice, and applies it. */
  function toggle() {
    isDark.value = !isDark.value
    hasOverride = true

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, theme.value)
    }

    applyTheme()
  }

  onMounted(() => {
    if (typeof window === 'undefined') return

    // 1. Check for a stored preference
    const stored = localStorage.getItem(STORAGE_KEY)

    if (stored === 'dark' || stored === 'light') {
      isDark.value = stored === 'dark'
      hasOverride = true
    } else {
      // 2. Fall back to system preference
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      isDark.value = mediaQuery.matches
      hasOverride = false

      // Listen for live system changes
      mediaQuery.addEventListener('change', handleSystemChange)
    }

    applyTheme()
  })

  onUnmounted(() => {
    mediaQuery?.removeEventListener('change', handleSystemChange)
  })

  return { isDark, theme, toggle }
}
