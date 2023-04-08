import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { requiresAuth: false }
    },
    {
      meta: { requiresAuth: true },
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      meta: { requiresAuth: true },
      path: '/app',
      name: 'app',
      component: () => import('@/views/AppView.vue')
    }
    /* {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    } */
  ]
})

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth as boolean) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      setTimeout(() => {
        return {
          path: '/login'
        }
      }, 1000)
    }
  }
})

export default router
