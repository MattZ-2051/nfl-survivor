import {
    getGamesFx,
    createGameFx,
    getGameProfileFx,
    joinGameFx,
    leaveGameFx,
    updateGamePickFx,
    startGameFx,
} from '@api'
import { Game } from '@types'
import { createEvent, createStore } from 'effector'
import { toast } from 'react-toastify'
import { updateStoreStatus } from '../status'
import { clearStorage } from '../user'

getGamesFx.doneData.watch((result) => {
    updateGames(result.games)
})

getGamesFx.failData.watch(() => {
    // logs user out and clears data if there is an error with the token
    clearStorage()
})

leaveGameFx.doneData.watch(() => {
    // getGameProfileFx()
    // getGamesFx()
    toast.success('Game left successfully')
})

leaveGameFx.failData.watch(() => {
    toast.error('Error leaving game')
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

joinGameFx.doneData.watch(() => {
    toast.success('Game Joined')
    getGameProfileFx()
    getGamesFx()
})

updateGamePickFx.doneData.watch(() => {
    getGameProfileFx()
    getGamesFx()
})

joinGameFx.failData.watch((error) => {
    if (error.response?.data && error.response.status === 400) {
        const errorMessage = error.response.data as { error: string }
        toast.error(errorMessage.error, { toastId: 'join-game-error' })
        return
    }
    toast.error('Error joining game', { toastId: 'join-game-error' })
})

startGameFx.doneData.watch(() => {
    getGamesFx()
    getGameProfileFx()
    toast.success('Game Started')
})

startGameFx.failData.watch(() => {
    toast.error('Error Starting Game')
})

const updateGames = createEvent<Game[]>()
export const $games = createStore<Game[] | null>(null).on(
    updateGames,
    (prevState, payload) => payload
)
