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
    redirect: '/posts/about',
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import('@/views/ArchiveView.vue'),
  },
  {
    path: '/posts/:slug',
    name: 'post',
    component: () => import('@/views/PostView.vue'),
  },
]
