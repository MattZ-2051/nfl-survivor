import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import { browserRouter } from '@routes'

const App: FC = () => {
    return (
        <>
            <RouterProvider router={browserRouter} />
        </>
    )
}

export default App