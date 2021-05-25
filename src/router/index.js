import Vue from 'vue'
import VueRouter from 'vue-router'
const AppLayout = () => import('@/components/layout/AppLayout')
const BoardsOverviewViewHeader = () => import('@/views/BoardsOverview/BoardsOverviewViewHeader')
const BoardsOverviewViewMain = () => import('@/views/BoardsOverview/BoardsOverviewViewMain')
const BoardViewHeader = () => import('@/views/BoardView/BoardViewHeader')
const BoardViewMain = () => import('@/views/BoardView/BoardViewMain')
const NotFoundView = () => import('@/views/NotFoundView')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/',
        redirect: '/boards'
      },
      {
        path: '/boards',
        name: 'BoardsView',
        components: {
          subheader: BoardsOverviewViewHeader,
          main: BoardsOverviewViewMain
        }
      },
      {
        path: '/board/:boardId',
        name: 'BoardView',
        components: {
          subheader: BoardViewHeader,
          main: BoardViewMain
        },
        props: {
          subheader: (route) => ({ boardId: route.params.boardId }),
          main: (route) => ({ boardId: route.params.boardId })
        }
      },
      {
        path: '/404',
        alias: '*',
        name: 'NotFound',
        components: {
          main: NotFoundView
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
