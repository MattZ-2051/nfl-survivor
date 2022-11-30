import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate,
    Outlet,
} from 'react-router-dom'

import { ErrorPage } from '@pages'
import { Home, Groups, Login } from '@pages'
import { Main, Header } from '@layout'
import { useStore } from 'effector-react'
import { $user } from '@store'
import 'react-toastify/dist/ReactToastify.css'

export const routes = {
    home: '/home',
    groups: '/groups',
    login: '/login',
}
const PrivateRoute = () => {
    const user = useStore($user)
    return user ? <Outlet /> : <Navigate to="/login" />
}

const UnauthenticatedRoutes = () => {
    const user = useStore($user)
    return !user ? <Outlet /> : <Navigate to="/home" />
}

export const browserRouter = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Main />}>
                <Route errorElement={<ErrorPage />}>
                    {/* Public Routes  */}
                    <Route path={'home'} element={<Home />} />
                    {/*  */}
                    {/* Private Routes  */}
                    <Route path="/" element={<PrivateRoute />}>
                        <Route path={routes.groups} element={<Groups />} />
                    </Route>
                    {/*  */}
                    {/* Routes that Can't be accessed if logged in  */}
                    <Route path="/" element={<UnauthenticatedRoutes />}>
                        <Route
                            path={routes.login}
                            element={<Login />}
                            action={() => {}}
                        />
                    </Route>

                    {/*  */}
                </Route>
            </Route>
        </>
    )
)
