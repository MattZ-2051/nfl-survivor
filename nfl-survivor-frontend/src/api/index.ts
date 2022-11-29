import axios from 'axios'
import type { ApiOptions } from '@types'

const baseURL = import.meta.env?.VITE_API_URL

const axiosInstance = axios.create({
    baseURL,
})

export const get = async (path: string, options?: ApiOptions): Promise<any> => {
    return await axiosInstance.get(path)
}

export const post = async (
    path: string,
    data: any,
    options?: ApiOptions
): Promise<any> => {
    return await axiosInstance.post(path, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
