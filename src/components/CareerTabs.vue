<script setup lang="ts">
import { ref, provide } from 'vue'
import type { Tab, TabsContext } from '@/types'

const tabs = ref<Tab[]>([])
const activeTabId = ref('')

const hasSelected = ref(false)

/**
 * Registers a tab panel's ID and label to be displayed in the tab navigation.
 * Automatically sets the first registered tab as active.
 */
const registerTab = (id: string, label: string) => {
  if (!tabs.value.some(t => t.id === id)) {
    tabs.value.unshift({ id, label })
    if (!hasSelected.value) {
      activeTabId.value = tabs.value[0].id
    }
  }
}

const selectTab = (id: string) => {
  activeTabId.value = id
  hasSelected.value = true
}

provide<TabsContext>('tabs-context', {
  activeTabId,
  registerTab,
})

</script>

<template>
  <div class="career-tabs">
    <div class="tabs-header-wrapper">
      <div role="tablist" aria-label="Career History" class="tabs-header">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          role="tab"
          :id="`tab-${tab.id}`"
          :aria-selected="activeTabId === tab.id"
          :aria-controls="`panel-${tab.id}`"
          :class="['tab-btn', { active: activeTabId === tab.id }]"
          @click="selectTab(tab.id)"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>
    <div class="tabs-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.career-tabs {
  margin-block: 2rem;
}

.tabs-header-wrapper {
  border-block-end: 1px solid var(--color-border);
  margin-block-end: 1.5rem;
}

.tabs-header {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

.tabs-header::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.tab-btn {
  background: none;
  border: none;
  font-family: var(--font-ui, 'Inter', sans-serif);
  font-size: 1rem;
  font-weight: 500;
  padding-block: 0.75rem;
  padding-inline: 0.25rem;
  color: var(--color-text-secondary);
  cursor: pointer;
  border-block-end: 2px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease;
  white-space: nowrap;
}

.tab-btn:hover {
  color: var(--color-accent-hover);
}

.tab-btn.active {
  color: var(--color-accent);
  border-block-end: 2px solid var(--color-accent);
}

.tab-btn:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: -2px;
  border-radius: 4px;
}

.tabs-content {
  animation: fadeIn 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
