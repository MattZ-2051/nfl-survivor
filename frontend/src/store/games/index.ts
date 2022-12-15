import { getGamesFx } from '@api'
import { Game } from '@types'
import { createEvent, createStore } from 'effector'

getGamesFx.doneData.watch((result) => {
    updateGames(result.games)
})

getGamesFx.failData.watch((error) => {
    // logs user out and clears data if there is an error with the token
    console.log('error', error)
})

const updateGames = createEvent<Game[]>()
export const $games = createStore<Game[] | null>(null).on(
    updateGames,
    (prevState, payload) => payload
)
