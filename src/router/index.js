import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Home from '@/views/layout/home.vue'
import Category from '@/views/layout/category.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'
import store from '@/store'

// 懒路由加载
const Login = () => import('@/views/login/index.vue')
const Search = () => import('@/views/search/index.vue')
const SearchList = () => import('@/views/search/list.vue')
const Myorder = () => import('@/views/myorder/index.vue')
const Pay = () => import('@/views/pay/index.vue')
const ProDetail = () => import('@/views/prodetail')

// 全局注册路由功能: 它将 Vue Router 安装为 Vue.js 的一个插件
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home', component: Home
      },
      {
        path: '/category', component: Category
      },
      {
        path: '/user', component: User
      },
      {
        path: '/cart', component: Cart
      }
    ]
  },
  {
    path: '/login', component: Login
  },
  {
    path: '/search', component: Search
  },
  {
    path: '/myorder', component: Myorder
  },
  {
    path: '/pay', component: Pay
  },
  {
    path: '/prodetail/:id', component: ProDetail // 动态路由
  },
  {
    path: '/searchlist', component: SearchList
  }
]

const router = new VueRouter({
  routes
})

// 路由前置守卫
const authUrl = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  const token = store.getters.token
  if (!authUrl.includes(to.path)) {
    next()
    return
  }

  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
