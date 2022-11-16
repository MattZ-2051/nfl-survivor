import axios from 'axios'
import ApiOptions from '@types/api'

const baseURL = import.meta.env?.VITE_API_URL

const axiosInstance = axios.create({
    baseURL,
})

export const get = async (path: string, options?: ApiOptions): Promise<any> => {
    return await axiosInstance.get(path)
}
