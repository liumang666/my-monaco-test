import { message } from 'antd'
import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { type AxiosInstance } from '@/types/fetch'

const errorCode: Record<string, string> = {
  '400': '请求参数错误(400)',
  '401': 'token过期，请重新登录(401)',
  '403': '无权访问(403)',
  '404': '访问资源不存在(404)',
  '408': '请求超时(408)',
  '500': '服务器错误(500)',
  '501': '服务未实现(501)',
  '502': '网络错误(502)',
  '503': '服务不可用(503)',
  '504': '网络超时(504)',
  '505': 'HTTP版本不受支持(505)',
}

const fetch: AxiosInstance = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'x-tenant-header': localStorage.getItem('session'),
  },
  timeout: 40 * 1000,
})

// 添加请求拦截器
fetch.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`)
    }
    return config
  },
  (error: unknown) => {
    return Promise.reject(error)
  }
)
//添加响应拦截器
fetch.interceptors.response.use(
  (response: AxiosResponse) => {
    // 2xx 范围内的状态码都会触发该函数。
    /**
     * response.status - 接口请求状态
     * response.data.code - 服务端返回的状态 （data数据都是由服务端返回）
     */
    const code = response.data?.code || response.status
    const msg = errorCode[code] || response.data?.message
    if (code !== 200) {
      message.error(msg)
      return Promise.reject(response.data || response)
    }
    return Promise.resolve(response.data)
  },
  (error: AxiosError) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 1. 网络错误/超时处理
    if (!error.response) {
      if (error.message.includes('timeout')) {
        message.error('请求超时，请检查网络后重试')
      } else {
        message.error('网络错误，请检查网络连接')
      }
      return Promise.reject(error)
    }

    const code = error?.response?.status
    const msg = errorCode[code] || (error?.response as AxiosResponse).data?.message

    message.error(msg)
    return Promise.reject(error)
  }
)

const useFetch = () => {
  return fetch
}

export default useFetch
