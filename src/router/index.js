import Vue from 'vue'
import VueRouter from 'vue-router'
const AppLayout = () => import('@/views/layout/AppLayout')
const BoardsView = () => import('@/views/BoardsView')
const ListsView = () => import('@/views/ListsView')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: AppLayout,
    redirect: '/boards',
    children: [
      {
        path: '/boards',
        name: 'Boards',
        component: BoardsView
      },
      {
        path: '/lists',
        name: 'Lists',
        component: ListsView
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
