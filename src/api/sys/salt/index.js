import axios from '@/plugin/axios'
let  host = 'http://127.0.0.1:8000';

//获取minion列表信息
export function getMinions(params) {
    return axios({
        url: `${host}/api/minionlist/`,
        method: 'get',
        params
    })
}

//刷新minion
export function refreshsalt(params) {
    return axios({
        url: `${host}/salt/refreshsalt/`,
        method: 'get',
        params
    })
}

//获取key列表信息
export function getKeyStatus(params) {
    return axios({
        url: `${host}/api/saltkey/`,
        method: 'get',
        params
    })
}
//ping minion
export function pingminion(params) {
    return axios({
        url: `${host}/salt/ping/`,
        method: 'get',
        params
    })
}
//keys
export function keysManage(params) {
    return axios({
        url: `${host}/salt/keys/`,
        method: 'get',
        params
    })
}