import Vue from 'vue'
import VueRouter from 'vue-router'
const AppLayout = () => import('@/components/layout/AppLayout')
const BoardsView = () => import('@/views/BoardsView')
const BoardView = () => import('@/views/BoardView')
const NotFoundView = () => import('@/views/NotFoundView')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/',
        redirect: '/boards',
      },
      {
        path: '/boards',
        name: 'BoardsView',
        component: BoardsView
      },
      {
        path: '/board/:boardId',
        name: 'BoardView',
        component: BoardView,
        props: true
      },
      {
        path: '*',
        name: 'NotFound',
        component: NotFoundView
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
