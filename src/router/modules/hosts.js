import layoutHeaderAside from '@/layout/header-aside'

const meta = {requiresAuth: true}

export default {
    path: '/hosts',
    name: 'hosts',
    meta,
    redirect: {name: 'idcs'},
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'assets',
            name: `${pre}assets`,
            component: () => import('@/pages/hosts/Hosts'),
            meta: {meta, title: '服务器'}
        },
        {path: 'idcs', name: `${pre}idcs`, component: () => import('@/pages/hosts/Idcs'), meta: {meta, title: '机房'}},
        {path: 'groups', name: `${pre}groups`, component: () => import('@/pages/hosts/Groups'), meta: {meta, title: '主机组'}},
        {
            path: 'units',
            name: `${pre}units`,
            component: () => import('@/pages/hosts/BusinessUnit'),
            meta: {meta, title: '业务线'}
        },
    ])('host-')
}
