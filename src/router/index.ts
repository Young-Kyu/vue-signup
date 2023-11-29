import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/signup/SignupView.vue')
    },
    {
      path: '/signup/complate',
      name: 'signupComplate',
      component: () => import('../views/signup/SignupComplateView.vue')
    }
  ]
})

export default router
