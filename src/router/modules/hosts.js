import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true }

export default {
  path: '/hosts',
  name: 'hosts',
  meta,
  redirect: { name: 'idcs' },
  component: layoutHeaderAside,
  children: (pre => [
      { path: 'assets', name: `${pre}assets`, component: () => import('@/pages/hosts/Hosts'), meta: { meta, title: '服务器' } },
     { path: 'idcs', name: `${pre}idcs`, component: () => import('@/pages/hosts/Idcs'), meta: { meta, title: '机房' } },
      { path: 'roles', name: `${pre}roles`, component: () => import('@/pages/hosts/Roles'), meta: { meta, title: '角色' } },
      { path: 'units', name: `${pre}units`, component: () => import('@/pages/hosts/BusinessUnit'), meta: { meta, title: '业务线' } },
  ])('host-')
}
