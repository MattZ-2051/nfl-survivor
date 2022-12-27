import { getGamesFx, createGameFx, getGameProfileFx } from '@api'
import { Game } from '@types'
import { createEvent, createStore } from 'effector'
import { toast } from 'react-toastify'
import { updateStoreStatus } from '../status'

getGamesFx.doneData.watch((result) => {
    updateGames(result.games)
})

getGamesFx.failData.watch(() => {
    // logs user out and clears data if there is an error with the token
    toast.error('Error getting games', { toastId: 'get-games-error' })
})

createGameFx.pending.watch(() => {
    updateStoreStatus('loading')
})

createGameFx.doneData.watch(() => {
    toast.success('Game Created', { toastId: 'create-game-success' })
    updateStoreStatus('done')
    getGameProfileFx()
    getGamesFx()
})

createGameFx.failData.watch((error) => {
    if (error.response) {
        const errorMessage = error.response.data as { error: string[] }
        errorMessage.error[0]
            ? toast.error(errorMessage.error[0], {
                  toastId: 'create-game-error',
              })
            : toast.error('Error creating game')
    }
})

const updateGames = createEvent<Game[]>()
export const $games = createStore<Game[] | null>(null).on(
    updateGames,
    (prevState, payload) => payload
)
