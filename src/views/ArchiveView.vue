<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { usePosts } from '@/composables/usePosts'
import Navbar from '@/components/Navbar.vue'
import PostCard from '@/components/PostCard.vue'
import { SITE_DESCRIPTION } from '@/constants'

const { posts } = usePosts()

useHead({
  title: '@bianca — All Posts',
  meta: [
    {
      name: 'description',
      content: `A complete archive of blog posts on @bianca. ${SITE_DESCRIPTION}`,
    },
  ],
})
</script>

<template>
  <div class="reading-container">
    <Navbar />

    <header class="archive-header">
      <h1 class="archive-title">Writing</h1>
    </header>

    <section aria-label="All blog posts">
      <PostCard
        v-for="post in posts"
        :key="post.meta.slug"
        :title="post.meta.title"
        :subtitle="post.meta.subtitle"
        :published-at="post.meta.publishedAt"
        :slug="post.meta.slug"
      />

      <p v-if="posts.length === 0" class="empty-state">
        No posts yet. Check back soon.
      </p>
    </section>
  </div>
</template>

<style scoped>
.archive-header {
  margin-block-end: 3rem;
}

.archive-title {
  font-family: var(--font-heading, 'Newsreader', serif);
  font-size: clamp(2rem, 1.5rem + 2vw, 3rem);
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.empty-state {
  color: var(--color-text-secondary);
  font-style: italic;
  line-height: 1.7;
}
</style>
