import { FC } from 'react'
import Button from '@components/Button'
import Header from '@layout/Header'

const Home: FC = (): JSX.Element => {
    return (
        <div>
            <Header />
            <h1>Home Page</h1>
            <Button type="primary" label="button" />
        </div>
    )
}

export default Home
