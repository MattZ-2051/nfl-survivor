import { FC } from 'react'
import Main from '@layout/Main'
import Header from '@layout/Header'
import Home from '@pages/Home'

const App: FC = () => {
    return (
        <Main>
            <Header />
            <Home />
        </Main>
    )
}

export default App
