import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home/Home'
import Login from '@/components/login/Login'
import Users from '@/components/users/Users'
import Roles from '@/components/roles/Roles'
import Rights from '@/components/rights/Rights'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/users', component: Users },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights }
      ]
    },
    { path: '/login', component: Login }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }

  const token = localStorage.getItem('token')
  if (token) {
    next()
  } else {

    next('/login')
  }

})

export default router
