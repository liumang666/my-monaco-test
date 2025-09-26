import type { AxiosRequestConfig, AxiosInstance as OriginAxiosInstance } from 'axios'

export interface AxiosInstance extends OriginAxiosInstance {
  <T = unknown>(config: AxiosRequestConfig): Promise<T>
  request<T = unknown>(config: AxiosRequestConfig): Promise<T>
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>
  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>
  head<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
  put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
  patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
}

interface ResultBase {
  code: number
  msg?: string
  [key: string]: unknown
}

export interface Result<T = undefined> extends ResultBase {
  data: T
}

export interface Results<T = undefined> extends ResultBase {
  rows: T[]
  page: number
  pageSize: number
  total: number
}
