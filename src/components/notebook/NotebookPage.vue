<script setup lang="ts">
import { inject, onMounted, onUnmounted, computed, useId } from 'vue'
import type { NotebookContext } from '@/types'

const props = defineProps<{
  label: string
}>()

const generatedId = useId()
const id = generatedId

const context = inject<NotebookContext>('notebook-context')

if (!context) {
  throw new Error('NotebookPage must be used inside Notebook')
}

onMounted(() => {
  context.registerPage(id, props.label)
})

onUnmounted(() => {
  context.unregisterPage(id)
})

const isActive = computed(() => context.activePageId.value === id)
</script>

<template>
  <div
    :id="`panel-${id}`"
    role="tabpanel"
    :aria-labelledby="`tab-${id}`"
    v-show="isActive"
    class="notebook-page-panel"
  >
    <slot />
  </div>
</template>

<style scoped>
.notebook-page-panel {
  width: 100%;
}
</style>
