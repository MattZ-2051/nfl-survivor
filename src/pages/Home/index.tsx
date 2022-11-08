import { FC } from 'react'
import Button from '@components/Button'
import { getTeams } from '@api/external'
import Header from '@layout/Header'

const Home: FC = (): JSX.Element => {
    return (
        <div>
            <Header />
            <h1>Home Page</h1>
            <Button>
                <div onClick={getTeams}>button</div>
            </Button>
        </div>
    )
}

export default Home
