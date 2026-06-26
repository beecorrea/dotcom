<script setup lang="ts">
import { useHead } from '@unhead/vue'
import Navbar from '@/components/Navbar.vue'
import { SITE_DESCRIPTION } from '@/constants'

useHead({
  title: '@bianca — About',
  meta: [
    {
      name: 'description',
      content: `About @bianca. ${SITE_DESCRIPTION}`,
    },
  ],
})
</script>

<template>
  <div class="reading-container">
    <Navbar />

    <article>
      <h1>About</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p>

      <p>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin feugiat.
      </p>

      <p>
        Mauris accumsan nulla vel diam. Sed in lacus ut enim adipiscing aliquet. Nulla venenatis. In pede mi, aliquet sit amet, euismod in, auctor ut, ligula. Aliquam dapibus tincidunt metus. Praesent justo dolor, lobortis quis, lobortis dignissim, pulvinar ac, lorem.
      </p>

      <section class="contact-section">
        <h2>Contact & Socials</h2>
        <p>
          If you want to connect or follow my work, you can find me on these platforms:
        </p>
        <ul class="contact-links">
          <li>
            <a href="https://github.com/beecorrea" target="_blank" rel="noopener noreferrer">GitHub</a>
          </li>
          <li>
            <a href="https://linkedin.com/in/beecorrea" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </li>
        </ul>
      </section>
    </article>
  </div>
</template>

<style scoped>

.contact-section {
  margin-block-start: 3rem;
  padding-block-start: 1.5rem;
  border-block-start: 1px solid var(--color-border);
}

.contact-links {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1.5rem;
  margin-block-start: 1rem;
}

.contact-links a {
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.contact-links a:hover {
  color: var(--color-accent);
}
</style>
