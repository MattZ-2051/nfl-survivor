import { FC } from 'react'
import Button from '@components/Button'

interface IProps {}

const Home: FC<IProps> = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <Button>
                <div>button</div>
            </Button>
        </div>
    )
}

export default Home
