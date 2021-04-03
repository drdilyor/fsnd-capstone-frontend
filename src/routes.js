import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Profile from './views/Profile.vue'
import Actors from './views/Actors.vue'
import ActorDetail from './views/ActorDetail.vue'
import NotFound from './views/404.vue'
import { registerRouter } from './auth'

Vue.use(VueRouter)
// const Nop = {
//   render(h) {
//     return h('div')
//   }
// }

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/actors',
    name: 'Actors',
    component: Actors,
    meta: {requiresAuth: true, requiresPerm: 'read:actor'},
    children: [
      {
        path: ':id',
        name: 'ActorDetail',
        component: ActorDetail,
        meta: {requiresPerm: 'update:actor'},
      }
    ]
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

registerRouter(router)

export default router
