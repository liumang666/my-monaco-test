import { createHashRouter, type DataRouter, type RouteObject } from 'react-router'
import { lazy } from 'react'
import Layout from '@/pages/components/layout'

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: lazy(() => import('@/pages/home')),
      },
      {
        path: 'editor',
        // lazy: async () =>
        //   Promise.resolve({
        //     Component: lazy(() => import('@/pages/editor')),
        //   }),
        Component: lazy(() => import('@/pages/editor')),
      },
      {
        path: 'about',
        Component: lazy(() => import('@/pages/about')),
      },
    ],
  },
]

const router: DataRouter = createHashRouter(routes)
export default router
