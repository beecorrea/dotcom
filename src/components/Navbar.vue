<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import BrandHandle from '@/components/BrandHandle.vue'

const route = useRoute()
const { isDark, toggle: toggleTheme } = useTheme()
const isDev = import.meta.env.DEV

// Dynamic target: '/' goes to '/about', other pages go to '/'
const brandLinkTarget = computed(() => {
  return route.path === '/' ? '/about' : '/'
})
</script>

<template>
  <nav class="navbar" aria-label="Main navigation">
    <div class="navbar-inner">
      <RouterLink :to="brandLinkTarget" class="navbar-brand">
        <BrandHandle />
      </RouterLink>

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
              {{ isDark ? '🌙' : '☀️' }}
            </span>
          </span>
        </span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  font-family: var(--font-ui, 'Inter', sans-serif);
  margin-block-end: 2.5rem;
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 0.75rem;
}

.navbar-brand {
  font-size: clamp(1.5rem, 1rem + 1.5vw, 2.25rem);
  font-weight: 600;
  text-decoration: none;
  line-height: 1.2;
  margin: 0;
  text-wrap: balance;
}

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
