import { FC } from 'react'
import Button from '@components/Button'
import { getTeams } from '@api/external'

interface IProps {}

const Home: FC<IProps> = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <Button>
                <div onClick={getTeams}>button</div>
            </Button>
        </div>
    )
}

export default Home
