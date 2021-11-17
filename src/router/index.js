import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../views/Products.vue'
import Discounts from '../views/Discounts.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Products',
    component: Products
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/discounts',
    name: 'Discounts',
    component: Discounts,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
