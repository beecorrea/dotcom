<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import { usePosts } from '@/composables/usePosts'
import Navbar from '@/components/Navbar.vue'
import PostCard from '@/components/PostCard.vue'

import { SITE_DESCRIPTION } from '@/constants'

const { posts } = usePosts()

// Only show the 2 most recent posts on the homepage
const recentPosts = computed(() => posts.value.slice(0, 2))

useHead({
  title: '@bianca',
  meta: [
    {
      name: 'description',
      content: SITE_DESCRIPTION,
    },
  ],
})
</script>

<template>
  <div class="reading-container">
    <Navbar />

    <header class="home-hero">
      <h1 class="blog-focus">
        {{ SITE_DESCRIPTION }}
      </h1>
    </header>

    <section aria-label="Blog posts">
      <PostCard
        v-for="post in recentPosts"
        :key="post.meta.slug"
        :title="post.meta.title"
        :subtitle="post.meta.subtitle"
        :published-at="post.meta.publishedAt"
        :slug="post.meta.slug"
      />

      <p v-if="posts.length === 0" class="empty-state">
        No posts yet. Check back soon.
      </p>

      <div v-if="posts.length > 0" class="archive-link-container">
        <RouterLink to="/posts" class="archive-link">
          All posts &rarr;
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-hero {
  margin-block-start: 1rem;
  margin-block-end: 3.5rem;
}

.blog-focus {
  font-family: var(--font-heading, 'Newsreader', serif);
  font-size: clamp(2.25rem, 1.75rem + 2.5vw, 3.5rem);
  font-weight: 500;
  line-height: 1.15;
  color: var(--color-text);
  margin: 0;
  text-wrap: pretty;
  letter-spacing: -0.02em;
}

.empty-state {
  color: var(--color-text-secondary);
  font-style: italic;
  line-height: 1.7;
}

.archive-link-container {
  margin-block-start: 3rem;
  margin-block-end: 2rem;
}

.archive-link {
  font-family: var(--font-ui, 'Inter', sans-serif);
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-accent);
  text-decoration: none;
  transition: color 0.2s ease;
}

.archive-link:hover {
  color: var(--color-accent-hover);
  text-decoration: underline;
  text-underline-offset: 0.25em;
}
</style>
