<script setup lang="ts">
import Footer from '@/components/Footer.vue'
import { provideTheme } from '@/composables/useTheme'

provideTheme()
</script>

<template>
  <div class="app-shell">
    <main id="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

#main-content {
  flex: 1;
  padding-block-start: 2rem;
  padding-block-end: 4rem;
}
</style>
