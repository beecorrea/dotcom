<script setup lang="ts">
import { inject, onMounted, onUnmounted, computed, useId } from 'vue'

const props = defineProps<{
  label: string
}>()

const id = useId()

const context = inject<{
  activeTabId: { value: string }
  registerTab: (id: string, label: string) => void
  unregisterTab: (id: string) => void
}>('tabs-context')

if (!context) {
  throw new Error('TabPanel must be used inside CareerTabs')
}

onMounted(() => {
  context.registerTab(id, props.label)
})

onUnmounted(() => {
  context.unregisterTab(id)
})

const isActive = computed(() => context.activeTabId.value === id)
</script>

<template>
  <div
    :id="`panel-${id}`"
    role="tabpanel"
    :aria-labelledby="`tab-${id}`"
    v-show="isActive"
    class="tab-panel"
  >
    <slot />
  </div>
</template>
