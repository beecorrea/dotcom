<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import BrandHandle from './BrandHandle.vue'
import ThemeToggle from './ThemeToggle.vue'

const route = useRoute()

// Dynamic target: '/' goes to '/posts/about', other pages go to '/'
const brandLinkTarget = computed(() => {
  return route.path === '/' ? '/notes/about' : '/'
})
</script>

<template>
  <nav class="navbar" aria-label="Main navigation">
    <div class="navbar-inner">
      <RouterLink :to="brandLinkTarget" class="navbar-brand">
        <BrandHandle />
      </RouterLink>

      <ThemeToggle />
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

</style>
