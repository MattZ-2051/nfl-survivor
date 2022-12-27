import { StoreStatus } from '@types'
import { createStore } from 'effector'
import { createEvent } from 'effector'

export const updateStoreStatus = createEvent<StoreStatus>()
export const $storeStatus = createStore<StoreStatus>('done').on(
    updateStoreStatus,
    (prevState, payload) => payload
)
