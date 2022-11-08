import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import Main from '@layout/Main'
import Header from '@layout/Header'

const App: FC = () => {
    return (
        <Main>
            <Header />
            <RouterProvider router={router} />
        </Main>
    )
}

export default App
