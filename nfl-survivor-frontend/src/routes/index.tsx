import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom'

import ErrorPage from '@pages/ErrorPage'
import Home from '@pages/Home'
import Groups from '@pages/Groups'

export const routes = {
    home: '/',
    groups: '/groups',
}

export const browserRouter = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route errorElement={<ErrorPage />}>
                <Route path={routes.home} element={<Home />} />
                <Route path={routes.groups} element={<Groups />} />
            </Route>
        </>
    )
)
