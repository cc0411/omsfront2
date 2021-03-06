// 菜单 侧边栏
export default [
    {path: '/index', title: '首页', icon: 'home'},
    {
        title: '主机管理',
        icon: 'server',
        children: [
            {path: '/hosts/idcs', title: '机房', icon: 'building'},
            {path: '/hosts/groups', title: '主机组', icon: 'user-secret'},
            {path: '/hosts/units', title: '业务线', icon: 'tags'},
            {path: '/hosts/assets', title: '服务器', icon: 'server'},
        ]
    },
    {
        title: 'salt',
        icon: 'cube',
        children: [
            {path: '/salt/minions', title: 'Minion信息', icon: 'exclamation-circle'},
            {path: '/salt/keys', title: 'SaltKey信息', icon: 'exclamation-circle'},
            {path: '/salt/cmd', title: '命令执行', icon: 'exclamation-circle'},

        ]
    },
]
