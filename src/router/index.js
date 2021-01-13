import Vue from 'vue'
import VueRouter from 'vue-router'
import SpellingBee from '../components/SpellingBee.vue'
import GamePicker from '../components/GamePicker.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/games',
    name: 'games',
    component: GamePicker
  },

  {
    path: '/:gameId',
    name: 'home',
    component: SpellingBee
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router