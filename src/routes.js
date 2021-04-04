import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Profile from './views/Profile.vue'
import Actors from './views/Actors.vue'
import ActorDetail from './views/ActorDetail.vue'
import ActorDelete from './views/ActorDelete.vue'
import ActorAdd from './views/ActorAdd.vue'
import Movies from './views/Movies.vue'
import MovieDetail from './views/MovieDetail.vue'
import MovieDelete from './views/MovieDelete.vue'
import MovieAdd from './views/MovieAdd.vue'
import NotFound from './views/404.vue'
import { registerRouter } from './auth'

Vue.use(VueRouter)

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
        path: 'add',
        name: 'ActorAdd',
        component: ActorAdd,
        meta: {requiresPerm: 'add:actor'},
      }, {
        path: ':id/delete',
        name: 'ActorDelete',
        component: ActorDelete,
        meta: {requiresPerm: 'delete:actor'},
      }, {
        path: ':id',
        name: 'ActorDetail',
        component: ActorDetail,
        meta: {requiresPerm: 'update:actor'},
      }
    ]
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies,
    meta: {requiresAuth: true, requiresPerm: 'read:movie'},
    children: [
      {
        path: 'add',
        name: 'MovieAdd',
        component: MovieAdd,
        meta: {requiresPerm: 'add:movie'},
      }, {
        path: ':id/delete',
        name: 'MovieDelete',
        component: MovieDelete,
        meta: {requiresPerm: 'delete:movie'},
      }, {
        path: ':id',
        name: 'MoviEDetail',
        component: MovieDetail,
        meta: {requiresPerm: 'update:movie'},
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
