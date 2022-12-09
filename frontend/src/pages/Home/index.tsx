import { FC } from 'react'

import { Header } from '@layout'
import { useEvent, useStore } from 'effector-react'
import { getUserProfileFx } from '@api/profile'
import { $profile } from '@store'

const Home: FC = (): JSX.Element => {
    const test = useEvent(getUserProfileFx)
    const profile = useStore($profile)

    return (
        <>
            <Header />
            <div className="h-screen bg-blue-500">
                <h1>asdfasdfsdfssd Page</h1>
                <h1>{profile?.games?.name}</h1>
                <button onClick={() => test()}>test api</button>
            </div>
        </>
    )
}

export default Home
