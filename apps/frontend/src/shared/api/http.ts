import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

interface HttpConfig {
  baseURL: string
  defaultHeaders: Record<string, string>
}

export interface ApiErrorBody {
  message: string
  errors?: unknown[]
}

export type HttpResponse<T> =
  { ok: true; status: number; data: T } | { ok: false; status: number; error: ApiErrorBody | null }

const httpClient = ({ baseURL, defaultHeaders }: HttpConfig) => {
  const axiosInstance = axios.create({
    baseURL,
    headers: defaultHeaders,
    withCredentials: true,
  })

  let bearerToken: string | null = null

  const request = async <T>(config: AxiosRequestConfig): Promise<HttpResponse<T>> => {
    const headers = { ...config.headers } as Record<string, string>

    if (bearerToken !== null) {
      headers['Authorization'] = `Bearer ${bearerToken}`
    }

    try {
      const { data, status } = await axiosInstance.request<T>({ ...config, headers })
      return { ok: true, status, data }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return {
          ok: false,
          status: err.response.status,
          error: (err.response.data as ApiErrorBody) ?? null,
        }
      }
      return { ok: false, status: 0, error: null }
    }
  }

  const fetchFull = <T>(config: AxiosRequestConfig): Promise<HttpResponse<T>> => request<T>(config)

  const setToken = (token: string): void => {
    bearerToken = token
  }

  const clearToken = (): void => {
    bearerToken = null
  }

  return { fetchFull, setToken, clearToken }
}

const baseURL: string = import.meta.env.VITE_API_URL ?? '/'

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
} as const

export const http = httpClient({ baseURL, defaultHeaders })
