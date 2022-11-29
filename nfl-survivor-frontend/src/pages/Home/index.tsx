import { FC } from 'react'
import { test } from '@api/user'

const Home: FC = (): JSX.Element => {
    console.log('here')
    return (
        <div className="h-screen bg-blue-500">
            <h1>asdfasdfsdfssd Page</h1>
            <button onClick={test}>test api</button>
        </div>
    )
}

export default Home
