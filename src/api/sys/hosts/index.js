import axios from '@/plugin/axios'
let  host = 'http://127.0.0.1:8000';

//添加主机
export const addHost = params => {return axios.post(`${host}/api/assets/`, params)}

//删除主机api/
export function delHost(id)  {
    return axios({
        url:`${host}/api/assets/`+id+'/',
        method:'delete',
    })
}

//修改主机信息
export function updateHost(id, data) {
    return axios({
        url: `${host}/api/assets/` + id + '/',
        method: 'patch',
        data
    })
}


//获取主机列表信息
export function getHosts(params) {
    return axios({
        url: `${host}/api/assets/`,
        method: 'get',
        params
    })
}



export function addIdc(data) {
    return axios({
        url: `${host}/api/idc/`,
        method: 'post',
        data
    })
}
//获取机房信息
export const getIdcs = () => { return axios.get(`${host}/api/idc/`) }

export function updateIdc(id, data) {
    return axios({
        url: `${host}/api/idc/` + id + '/',
        method: 'patch',
        data
    })
}

export function deleteIdc(id) {
    return axios({
        url: `${host}/api/idc/` + id + '/',
        method: 'delete'
    })
}


export function addgroup(data) {
    return axios({
        url: `${host}/api/group/`,
        method: 'post',
        data
    })
}
//获取角色信息
export const getGroup = () => { return axios.get(`${host}/api/group/`) }

export function updateGroup(id, data) {
    return axios({
        url: `${host}/api/group/` + id + '/',
        method: 'patch',
        data
    })
}

export function deleteGroup(id) {
    return axios({
        url: `${host}/api/group/` + id + '/',
        method: 'delete'
    })
}


export function addBusinessUnit(data) {
    return axios({
        url: `${host}/api/businessunit/`,
        method: 'post',
        data
    })
}
//获取业务线信息
export const getBusinessUnits = (params) => {return axios.get(`${host}/api/businessunit/`) }


export function updateBusinessUnit(id, data) {
    return axios({
        url: `${host}/api/businessunit/` + id + '/',
        method: 'patch',
        data
    })
}

export function deleteBusinessUnit(id) {
    return axios({
        url: `${host}/api/businessunit/` + id + '/',
        method: 'delete'
    })
}