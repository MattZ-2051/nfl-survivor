import { createEvent, createStore } from 'effector'
import { getUserProfileFx } from '@api'
import { Profile } from '@types'

getUserProfileFx.doneData.watch((result) => {
    updateUserProfile(result)
})

getUserProfileFx.failData.watch(() => {
    // logs user out and clears data if there is an error with the token
    clearUserProfile()
})

const updateUserProfile = createEvent<Profile>()

export const clearUserProfile = createEvent<void>()
export const $profile = createStore<Profile | null>(null)
    .on(updateUserProfile, (prevState, payload) => {
        return payload
    })
    .reset(clearUserProfile)
