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

export interface RequestOptions extends AxiosRequestConfig {
  skipAuthRefresh?: boolean
}

type RefreshHandler = () => Promise<boolean>

const httpClient = ({ baseURL, defaultHeaders }: HttpConfig) => {
  const axiosInstance = axios.create({
    baseURL,
    headers: defaultHeaders,
    withCredentials: true,
  })

  let bearerToken: string | null = null
  let refreshHandler: RefreshHandler | null = null
  let refreshPromise: Promise<boolean> | null = null

  const refreshOnce = (): Promise<boolean> => {
    if (!refreshHandler) return Promise.resolve(false)
    refreshPromise ??= refreshHandler().finally(() => {
      refreshPromise = null
    })
    return refreshPromise
  }

  const request = async <T>(options: RequestOptions, isRetry = false): Promise<HttpResponse<T>> => {
    const { skipAuthRefresh, ...config } = options
    const headers = { ...config.headers } as Record<string, string>

    if (bearerToken !== null) {
      headers['Authorization'] = `Bearer ${bearerToken}`
    }

    try {
      const { data, status } = await axiosInstance.request<T>({ ...config, headers })
      return { ok: true, status, data }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        const { status, data } = err.response

        if (status === 401 && !isRetry && !skipAuthRefresh && (await refreshOnce())) {
          return request<T>(options, true)
        }

        return { ok: false, status, error: (data as ApiErrorBody) ?? null }
      }
      return { ok: false, status: 0, error: null }
    }
  }

  const fetchFull = <T>(options: RequestOptions): Promise<HttpResponse<T>> => request<T>(options)

  const setToken = (token: string): void => {
    bearerToken = token
  }

  const clearToken = (): void => {
    bearerToken = null
  }

  const setRefreshHandler = (handler: RefreshHandler): void => {
    refreshHandler = handler
  }

  return { fetchFull, setToken, clearToken, setRefreshHandler }
}

const baseURL: string = import.meta.env.VITE_API_URL ?? '/'

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
} as const

export const http = httpClient({ baseURL, defaultHeaders })
