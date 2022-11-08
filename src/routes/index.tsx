import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom'
import ErrorPage from '@pages/ErrorPage'
import Home from '@pages/Home'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
    )
)
export default router
