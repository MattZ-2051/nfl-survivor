import { createEvent, createStore } from 'effector'
import { getGameProfileFx, updateGamePickFx } from '@api'
import { GameProfile } from '@types'
import { toast } from 'react-toastify'

getGameProfileFx.doneData.watch((result) => {
    updateGameProfile(result.profile)
})

getGameProfileFx.failData.watch(() => {
    // logs user out and clears data if there is an error with the token
})

const updateGameProfile = createEvent<GameProfile[] | null>()

export const $gameProfile = createStore<GameProfile[] | null>(null).on(
    updateGameProfile,
    (prevState, payload) => payload
)

updateGamePickFx.doneData.watch(() => {
    getGameProfileFx()
    toast.success('Pick Updated', { toastId: 'update-pick-success' })
})

updateGamePickFx.failData.watch((error) => {
    const errorMessage = error.response?.data as Record<string, string>
    if (errorMessage) {
        toast.error(errorMessage.error)
    } else {
        toast.error('Failed to update pick', { toastId: 'updated-pick-fail' })
    }
})
