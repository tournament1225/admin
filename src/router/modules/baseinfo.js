/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const baseInfoRouter = {
  path: '/baseinfo',
  component: Layout,
  redirect: '/base-info/device',
  name: 'BaseInfo',
  meta: {
    title: 'baseinfo',
    icon: 'nested'
  },
  children: [
    {
      path: 'device',
      name: 'Device',
      component: () => import('@/views/base-info/device'),
      meta: { title: 'device' }
    },
    {
      path: 'plc',
      name: 'Plc',
      component: () => import('@/views/base-info/plc'),
      meta: { title: 'plc' }
    }
  ]
}

export default baseInfoRouter
