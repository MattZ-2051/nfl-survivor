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
import 'react-toastify/dist/ReactToastify.css'
import Header from '@layout/Header'

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
    return !user ? <Outlet /> : <Navigate to="/home" />
}

export const browserRouter = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Main />}>
                <Route errorElement={<ErrorPage />}>
                    <Route path="/" element={<Header />}>
                        {/* Public Routes  */}
                        <Route path={routes.home} element={<Home />} />
                        {/*  */}
                        {/* Private Routes  */}
                        <Route path="/" element={<PrivateRoute />}>
                            <Route path={routes.groups} element={<Groups />} />
                        </Route>
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
