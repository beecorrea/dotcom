<script setup lang="ts">
import { useThemeContext, type ThemeContext } from '@/composables/useTheme'
import { computed } from 'vue';

const ThemeIcon = {
  DARK: '🌙',
  LIGHT: '☀️',
} as const

const { isDark, toggle: toggleTheme, isDev }: ThemeContext = useThemeContext()
const themeIcon = computed(() => isDark.value ? ThemeIcon.DARK : ThemeIcon.LIGHT)
</script>

<template>
<button
        v-if="isDev"
        class="theme-toggle"
        role="switch"
        :aria-checked="isDark"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggleTheme"
      >
        <span class="theme-toggle-track">
          <span class="theme-toggle-thumb">
            <span class="theme-toggle-icon" aria-hidden="true">
              {{ themeIcon }}
            </span>
          </span>
        </span>
      </button>  
</template>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  min-block-size: 2rem;
  min-inline-size: 3rem;
}

.theme-toggle-track {
  position: relative;
  width: 2.75rem;
  height: 1.5rem;
  background-color: var(--color-bg-subtle);
  border-radius: 1rem;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  border: 1px solid var(--color-border);
}

.theme-toggle:hover .theme-toggle-track {
  border-color: var(--color-accent);
}

.theme-toggle[aria-checked="true"] .theme-toggle-track {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
}

.theme-toggle-thumb {
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  width: 1.125rem;
  height: 1.125rem;
  background-color: var(--color-bg);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease;
}

.theme-toggle[aria-checked="true"] .theme-toggle-thumb {
  transform: translateX(1.25rem);
}

.theme-toggle-icon {
  font-size: 0.75rem;
  line-height: 1;
}

.theme-toggle:focus-visible .theme-toggle-track {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
</style>