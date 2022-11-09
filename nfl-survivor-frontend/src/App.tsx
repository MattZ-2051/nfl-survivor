import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import { browserRouter } from '@routes'
import Main from '@layout/Main'

const App: FC = () => {
    return (
        <Main>
            <RouterProvider router={browserRouter} />
        </Main>
    )
}

export default App
