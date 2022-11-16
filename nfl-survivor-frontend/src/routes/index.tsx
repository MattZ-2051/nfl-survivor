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
import { useStore } from 'effector-react'
import { $user } from '@store/user'

export const routes = {
    home: '/home',
    groups: '/groups',
    login: '/login',
}
const PrivateRoute = () => {
    const user = useStore($user)
    return user?.username ? <Outlet /> : <Navigate to="/login" />
}

const UnauthenticatedRoutes = () => {
    const user = useStore($user)
    return !user?.username ? <Outlet /> : <Navigate to="/home" />
}

export const browserRouter = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Main />}>
                <Route errorElement={<ErrorPage />}>
                    <Route path={routes.home} element={<Home />} />
                    <Route path="/" element={<PrivateRoute />}>
                        <Route path={routes.groups} element={<Groups />} />
                    </Route>
                    <Route path="/" element={<UnauthenticatedRoutes />}>
                        <Route
                            path={routes.login}
                            element={<Login />}
                            action={() => console.log('action')}
                        />
                    </Route>
                </Route>
            </Route>
        </>
    )
)
