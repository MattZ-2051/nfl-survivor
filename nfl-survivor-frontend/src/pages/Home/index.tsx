import { FC } from 'react'
import { test } from '@api/user'
import { Header } from '@layout'

const Home: FC = (): JSX.Element => {
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
