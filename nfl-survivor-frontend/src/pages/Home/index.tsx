import { FC } from 'react'
import Header from '@layout/Header'
import { test } from '@api/user'

const Home: FC = (): JSX.Element => {
    return (
        <div>
            <Header />
            <h1>Home Page</h1>
            <button onClick={test}>test api</button>
        </div>
    )
}

export default Home
