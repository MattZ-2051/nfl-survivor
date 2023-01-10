import axios from 'axios'
import type { ApiOptions } from '@types'
import { $user } from '@store'

const baseURL = import.meta.env?.VITE_API_URL

const axiosInstance = axios.create({
    baseURL,
})

const getHeaders = () => {
    return $user.getState()
        ? {
              headers: {
                  'Content-Type': 'application/json',
                  Authorization:
                      'Bearer ' +
                      $user.getState()?.authTokens.access.toString(),
              },
          }
        : {}
}
export const get = async (path: string, options?: ApiOptions): Promise<any> => {
    return await axiosInstance.get(path, getHeaders())
}

export const post = async (
    path: string,
    data: any,
    options?: ApiOptions
): Promise<any> => {
    return await axiosInstance.post(path, data, getHeaders())
}

export const patch = async (path: string, data?: any): Promise<any> => {
    return await axiosInstance.patch(path, data, getHeaders())
}

export const del = async (path: string): Promise<any> => {
    return await axiosInstance.delete(path, getHeaders())
}
