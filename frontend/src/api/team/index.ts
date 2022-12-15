import { createEffect } from 'effector'
import { Team } from '@types'
import { get } from '../methods'

export const getTeamsFx = createEffect<void, { teams: Team[] }>(async () => {
    const response = await get('/api/teams/')
    return response.data
})
