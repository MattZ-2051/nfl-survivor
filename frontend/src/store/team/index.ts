import { getTeamsFx } from '@api'
import { Team } from '@types'
import { createEvent, createStore } from 'effector'
import { toast } from 'react-toastify'

getTeamsFx.doneData.watch((result) => {
    updateTeams(result.teams)
})

getTeamsFx.failData.watch(() => {
    toast.error('Error getting teams', { toastId: 'get-teams-error' })
})

const updateTeams = createEvent<Team[]>()
export const $teams = createStore<Team[] | null>(null).on(
    updateTeams,
    (prevState, payload) => payload
)
