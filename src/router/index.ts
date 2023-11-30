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

router.beforeEach(function (to, from, next) {
  // 권한이 필요한 화면에 접근 시 현재 로그인 여부를 해당 로직에서 판단해야함.
  next();
});

export default router
