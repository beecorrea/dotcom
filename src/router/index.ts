import type { RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    redirect: '/notes/about',
  },
  {
    path: '/career',
    redirect: '/notes/career',
  },
  {
    path: '/notes',
    name: 'notes',
    component: () => import('@/views/ArchiveView.vue'),
  },
  {
    path: '/notes/:slug',
    name: 'note',
    component: () => import('@/views/NoteView.vue'),
  },
]
