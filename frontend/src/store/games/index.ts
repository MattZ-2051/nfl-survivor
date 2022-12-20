import { getGamesFx, createGameFx } from '@api'
import { Game } from '@types'
import { createEvent, createStore } from 'effector'
import { toast } from 'react-toastify'

getGamesFx.doneData.watch((result) => {
    updateGames(result.games)
})

getGamesFx.failData.watch(() => {
    // logs user out and clears data if there is an error with the token
    toast.error('Error getting games', { toastId: 'get-games-error' })
})

createGameFx.doneData.watch(() => {
    toast.success('Game Created', { toastId: 'create-game-success' })
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
