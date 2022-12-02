import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import { BrowserRouter } from '@routes'

const App: FC = () => {
    return (
        <>
            <RouterProvider router={BrowserRouter()} />
        </>
    )
}

export default App
