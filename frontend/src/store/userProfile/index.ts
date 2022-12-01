import { createEvent, createStore } from 'effector'
import { getUserProfileFx } from '@api/userProfile'
import { User } from '@types'
import { checkStorage, decodeJwtToken } from '@utils'
import { toast } from 'react-toastify'

getUserProfileFx.doneData.watch((result) => {
    console.log('in store', result)
    // updateUserProfile(result)
})

getUserProfileFx.failData.watch((error) => {
    console.log('store error', error)
})

const updateUserProfile = createEvent()
const clearUserProfile = createEvent()

export const $userProfile = createStore(null)
    .on(updateUserProfile, (prevState, payload) => {
        return payload
    })
    .reset(clearUserProfile)
