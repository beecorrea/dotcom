<script setup lang="ts">
import { inject, onMounted, computed, useId } from 'vue'
import type { TabsContext } from '@/types'

const props = defineProps<{
  label: string
}>()

const id = useId()
const context = inject<TabsContext>('tabs-context')

if (!context) {
  throw new Error('TabPanel must be used inside CareerTabs')
}

onMounted(() => {
  context.registerTab(id, props.label)
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
