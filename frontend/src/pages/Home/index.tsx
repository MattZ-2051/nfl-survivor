import { FC } from 'react'
import { Header } from '@layout'
import { useEvent } from 'effector-react'
import { getUserProfileFx } from '@api/userProfile'

const Home: FC = (): JSX.Element => {
    const test = useEvent(getUserProfileFx)
    return (
        <>
            <Header />
            <div className="h-screen bg-blue-500">
                <h1>asdfasdfsdfssd Page</h1>
                <button onClick={test}>test api</button>
            </div>
        </>
    )
}

export default Home
