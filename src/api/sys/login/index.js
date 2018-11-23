import request from '@/plugin/axios'

let host = 'http://127.0.0.1:8000'
export function AccountLogin (data) {
  return request({
    url: `${host}/login/`,
    method: 'post',
    data
  })
}
