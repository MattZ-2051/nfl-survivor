import { createEvent, createStore } from 'effector'
import { getGameProfileFx } from '@api'
import { GameProfile } from '@types'

getGameProfileFx.doneData.watch((result) => {
    updateGameProfile(result.profile)
})

getGameProfileFx.failData.watch(() => {
    // logs user out and clears data if there is an error with the token
})

const updateGameProfile = createEvent<GameProfile | null>()

export const $gameProfile = createStore<GameProfile | null>(null).on(
    updateGameProfile,
    (prevState, payload) => payload
)
