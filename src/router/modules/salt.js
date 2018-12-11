import layoutHeaderAside from '@/layout/header-aside'

const meta = {requiresAuth: true}

export default {
    path: '/salt',
    name: 'salt',
    meta,
    redirect: {name: 'minions'},
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'minions',
            name: `${pre}minions`,
            component: () => import('@/pages/salt/Minion'),
            meta: {meta, title: 'Minion信息'}
        },
        {
            path: 'keys',
            name: `${pre}keys`,
            component: () => import('@/pages/salt/SaltKey'),
            meta: {meta, title: 'SaltKey信息'}
        },
        {
            path: 'cmd',
            name: `${pre}cmd`,
            component: () => import('@/pages/salt/SaltCmd'),
            meta: {meta, title: '命令执行'}
        },

    ])('salt-')
}