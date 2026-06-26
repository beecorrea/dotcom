import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'
import './assets/globals.css'
import './assets/tufte-overrides.css'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(_to, _from, savedPosition) {
      return savedPosition ?? { top: 0 }
    },
  },
  ({ app, isClient }) => {
    if (isClient) {
      // Client-side only setup can go here
    }
  },
)
