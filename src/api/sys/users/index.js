 import axios from '@/plugin/axios'
// import axios from 'axios'
let host = 'http://127.0.0.1:8000'

//获取用户信息
export const getUserDetail = () => { return axios.get(`${host}/api/users/1/`) }

//修改用户信息
export const updateUserInfo = params => { return axios.patch(`${host}/api/users/1/`, params) }