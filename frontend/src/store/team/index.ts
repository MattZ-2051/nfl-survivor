import { getTeamsFx } from '@api'
import { Team } from '@types'
import { createEvent, createStore } from 'effector'

getTeamsFx.doneData.watch((result) => {
    updateTeams(result.teams)
})

getTeamsFx.failData.watch((error) => {
    // logs user out and clears data if there is an error with the token
    console.log('error', error)
})

const updateTeams = createEvent<Team[]>()
export const $teams = createStore<Team[] | null>(null).on(
    updateTeams,
    (prevState, payload) => payload
)
