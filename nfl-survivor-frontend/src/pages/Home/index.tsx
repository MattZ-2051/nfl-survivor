import { FC } from 'react'
import { test } from '@api/user'

const Home: FC = (): JSX.Element => {
    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={test}>test api</button>
        </div>
    )
}

export default Home
