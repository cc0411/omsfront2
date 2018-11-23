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


export function addRole(data) {
    return axios({
        url: `${host}/api/role/`,
        method: 'post',
        data
    })
}
//获取角色信息
export const getRoles = () => { return axios.get(`${host}/api/role/`) }

export function updateRole(id, data) {
    return axios({
        url: `${host}/api/role/` + id + '/',
        method: 'patch',
        data
    })
}

export function deleteRole(id) {
    return axios({
        url: `${host}/api/role/` + id + '/',
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

//获取业务线树
export const getBusinessUnitTree = () => { return axios.get(`${host}/api/treeassets/`) }


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