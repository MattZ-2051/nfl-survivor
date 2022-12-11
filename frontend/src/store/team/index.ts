import { getTeamsFx } from '@api'

getTeamsFx.doneData.watch((result) => {
    console.log('result', result)
})

getTeamsFx.failData.watch((error) => {
    // logs user out and clears data if there is an error with the token
    console.log('error', error)
})
