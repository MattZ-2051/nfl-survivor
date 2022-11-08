import axios from 'axios'
import { ApiOptions } from '@types'

export const get = async (path: string, options: ApiOptions): Promise<any> => {
    if (options.authorization) {
        // code here to get auth token from store
        return await axios.get(path)
    } else {
        return await axios.get(path)
    }
}
