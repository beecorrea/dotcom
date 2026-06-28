<script setup lang="ts">
import { RouterLink } from 'vue-router'

</script>

<template>
  <footer role="contentinfo" class="site-footer">
    <div class="footer-inner">
      <p class="footer-text">
        <RouterLink to="/notes/about" class="footer-link">About</RouterLink>
        <span class="divider">&middot;</span>
        <a href="https://github.com/beecorrea" target="_blank" rel="noopener noreferrer" class="footer-link">GitHub</a>
        <span class="divider">&middot;</span>
        <a href="https://linkedin.com/in/beecorrea" target="_blank" rel="noopener noreferrer" class="footer-link">LinkedIn</a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  font-family: var(--font-ui, 'Inter', sans-serif);
  border-block-start: 1px solid var(--color-border);
  padding-block: 2rem;
  padding-inline: 1.5rem;
  margin-block-start: auto;
}

.footer-inner {
  max-width: 42.5rem;
  margin-inline: auto;
  text-align: center;
}

.footer-text {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.divider {
  margin-inline: 0.5rem;
  color: var(--color-border);
}

.footer-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--color-accent);
}

.footer-link.router-link-active {
  color: var(--color-text);
  font-weight: 600;
}
</style>
