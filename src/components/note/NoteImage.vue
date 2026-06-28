<template>
  <div class="image-center-wrapper">
    <img :src="image" :alt="caption" class="note-image" />
    <figcaption class="note-image-caption">{{ caption }}</figcaption>
  </div>
</template>

<script setup lang="ts">
interface Props {
  image: string;
  caption: string;
}

defineProps<Props>();

</script>

<style scoped>
.image-center-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-block: 2.5rem;
  width: 100%;
}

.note-image {
  width: 100%;
  max-width: 18rem; /* Small on mobile */
  height: auto;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.note-image-caption {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  margin-top: 0.5rem;
  text-align: center;
  font-family: var(--font-body);
  font-style: italic;
}

@media (min-width: 768px) {
  .note-image {
    max-width: 32rem; /* Medium on desktop */
  }
}

</style>