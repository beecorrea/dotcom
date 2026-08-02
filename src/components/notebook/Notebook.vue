<script setup lang="ts">
import { ref, provide, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { NotebookPageData, NotebookContext } from '@/types'

const route = useRoute()
const router = useRouter()

const pages = ref<NotebookPageData[]>([])
const activePageId = ref('')
const hasUserSelected = ref(false)

const registerPage = (id: string, label: string) => {
  const existingIndex = pages.value.findIndex(p => p.id === id)
  if (existingIndex === -1) {
    pages.value.push({ id, label })
  } else {
    pages.value[existingIndex].label = label
  }

  // Set initial active page based on query param or default to first page
  if (!activePageId.value && pages.value.length > 0) {
    const pageQuery = route.query.page
    if (pageQuery) {
      const pageNum = parseInt(String(pageQuery), 10)
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= pages.value.length) {
        activePageId.value = pages.value[pageNum - 1].id
        return
      }
    }
    if (!hasUserSelected.value) {
      activePageId.value = pages.value[0].id
    }
  }
}

const unregisterPage = (id: string) => {
  pages.value = pages.value.filter(p => p.id !== id)
  if (activePageId.value === id && pages.value.length > 0) {
    activePageId.value = pages.value[0].id
  }
}

const activeIndex = computed(() => {
  return pages.value.findIndex(p => p.id === activePageId.value)
})

const selectPage = (id: string) => {
  activePageId.value = id
  hasUserSelected.value = true
  const idx = pages.value.findIndex(p => p.id === id)
  if (idx !== -1) {
    const pageNum = String(idx + 1)
    if (route.query.page !== pageNum) {
      router.replace({
        query: {
          ...route.query,
          page: pageNum,
        },
      })
    }
  }
}

const selectPrevPage = () => {
  if (activeIndex.value > 0) {
    selectPage(pages.value[activeIndex.value - 1].id)
  }
}

const selectNextPage = () => {
  if (activeIndex.value < pages.value.length - 1) {
    selectPage(pages.value[activeIndex.value + 1].id)
  }
}

// Watch query param changes (e.g. browser back/forward)
watch(
  () => route.query.page,
  (newPageQuery) => {
    if (newPageQuery && pages.value.length > 0) {
      const pageNum = parseInt(String(newPageQuery), 10)
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= pages.value.length) {
        const targetId = pages.value[pageNum - 1].id
        if (targetId !== activePageId.value) {
          activePageId.value = targetId
        }
      }
    }
  }
)

const handleKeyDown = (event: KeyboardEvent) => {
  // Only trigger if focus is not inside an editable element
  const target = event.target as HTMLElement
  if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
    return
  }

  if (event.key === 'ArrowLeft') {
    selectPrevPage()
  } else if (event.key === 'ArrowRight') {
    selectNextPage()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

provide<NotebookContext>('notebook-context', {
  activePageId,
  registerPage,
  unregisterPage,
  pages,
})
</script>

<template>
  <div class="notebook-container">
    <!-- Notebook Index Tabs -->
    <nav class="notebook-tabs-wrapper" aria-label="Notebook Pages">
      <div role="tablist" class="notebook-tabs">
        <button
          v-for="(page, idx) in pages"
          :key="page.id"
          role="tab"
          :id="`tab-${page.id}`"
          :aria-selected="activePageId === page.id"
          :aria-controls="`panel-${page.id}`"
          :class="['notebook-tab-btn', { active: activePageId === page.id }]"
          @click="selectPage(page.id)"
        >
          <span class="tab-index">p.{{ idx + 1 }}</span>
          <span class="tab-label">{{ page.label }}</span>
        </button>
      </div>
    </nav>

    <!-- Notebook Paper Stack Card -->
    <div class="notebook-paper">
      <div class="notebook-content">
        <slot />
      </div>

      <!-- Footer Pagination Controls -->
      <footer v-if="pages.length > 1" class="notebook-footer">
        <button
          class="page-nav-btn prev"
          :disabled="activeIndex <= 0"
          @click="selectPrevPage"
          aria-label="Previous Page"
        >
          &larr; Previous Page
        </button>

        <div class="page-counter">
          <span class="page-current">Page {{ activeIndex + 1 }}</span>
          <span class="page-separator"> / </span>
          <span class="page-total">{{ pages.length }}</span>
        </div>

        <button
          class="page-nav-btn next"
          :disabled="activeIndex >= pages.length - 1"
          @click="selectNextPage"
          aria-label="Next Page"
        >
          Next Page &rarr;
        </button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.notebook-container {
  margin-block: 2.5rem;
  position: relative;
}

/* Notebook Index Tabs Bar */
.notebook-tabs-wrapper {
  margin-block-end: -1px; /* Align seamlessly with paper top border */
  z-index: 2;
  position: relative;
  overflow-x: auto;
  scrollbar-width: none;
}

.notebook-tabs-wrapper::-webkit-scrollbar {
  display: none;
}

.notebook-tabs {
  display: flex;
  gap: 0.375rem;
  padding-inline-start: 0.5rem;
  align-items: flex-end;
}

.notebook-tab-btn {
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border);
  border-bottom: none;
  border-radius: 0.5rem 0.5rem 0 0;
  font-family: var(--font-ui, 'Inter', sans-serif);
  font-size: 0.9rem;
  padding-block: 0.5rem;
  padding-inline: 0.875rem;
  color: var(--color-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.notebook-tab-btn .tab-index {
  font-family: var(--font-heading, serif);
  font-weight: 600;
  font-size: 0.8em;
  opacity: 0.75;
}

.notebook-tab-btn:hover {
  color: var(--color-accent-hover);
  background: var(--color-bg);
}

.notebook-tab-btn.active {
  background: var(--color-bg);
  color: var(--color-accent);
  border-color: var(--color-border);
  font-weight: 500;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.04);
  padding-block-start: 0.625rem;
}

.notebook-tab-btn:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: -2px;
}

/* Notebook Paper Styling with Stacked Sheets Shadow Effect */
.notebook-paper {
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 0 0.5rem 0.5rem 0.5rem;
  position: relative;
  padding-inline: clamp(1.25rem, 3vw, 2.25rem);
  padding-block-start: clamp(1.5rem, 3vw, 2.5rem);
  padding-block-end: 1.5rem;
  /* Stacked paper edge shadows */
  box-shadow:
    0 1px 1px rgba(0, 0, 0, 0.03),
    0 3px 0 -1px var(--color-bg),
    0 3px 0 0px var(--color-border),
    0 6px 0 -2px var(--color-bg),
    0 6px 0 -1px var(--color-border),
    0 8px 12px -2px rgba(0, 0, 0, 0.05);
}

.notebook-content {
  min-height: 12rem;
  animation: pageFadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes pageFadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Bottom Footer Pagination */
.notebook-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-block-start: 2.5rem;
  padding-block-start: 1.25rem;
  border-block-start: 1px dashed var(--color-border);
}

.page-nav-btn {
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  font-family: var(--font-ui, 'Inter', sans-serif);
  font-size: 0.875rem;
  font-weight: 500;
  padding-block: 0.4rem;
  padding-inline: 0.75rem;
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-nav-btn:hover:not(:disabled) {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background-color: var(--color-bg-subtle);
}

.page-nav-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  border-color: var(--color-border);
}

.page-counter {
  font-family: var(--font-heading, serif);
  font-size: 0.95rem;
  color: var(--color-text-secondary);
}

.page-current {
  font-weight: 600;
  color: var(--color-text);
}
</style>
