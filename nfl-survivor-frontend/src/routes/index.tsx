import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate,
    Outlet,
} from 'react-router-dom'

import ErrorPage from '@pages/ErrorPage'
import Home from '@pages/Home'
import Groups from '@pages/Groups'
import Login from '@pages/Login'
import Main from '@layout/Main'

export const routes = {
    home: '/home',
    groups: '/groups',
    login: '/login',
}
const PrivateRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export const browserRouter = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Main />}>
                <Route errorElement={<ErrorPage />}>
                    <Route path={routes.home} element={<Home />} />
                    <Route
                        path="/"
                        element={<PrivateRoute isAuthenticated={false} />}
                    >
                        <Route path={routes.groups} element={<Groups />} />
                    </Route>
                    <Route
                        path={routes.login}
                        element={<Login />}
                        action={() => console.log('action')}
                    />
                </Route>
            </Route>
        </>
    )
)
