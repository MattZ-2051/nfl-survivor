import { get } from '../methods'
import { createEffect } from 'effector'

export const getTeamsFx = createEffect<any, any>(async () => {
    const response = await get('/api/crawl/')
    return response.data
})
