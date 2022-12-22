import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate,
    Outlet,
} from 'react-router-dom'

import { ErrorPage } from '@pages'
import { Home, Games, Login, Signup, GameDetail } from '@pages'
import { Main } from '@layout'
import 'react-toastify/dist/ReactToastify.css'
import { createStoreConsumer } from 'effector-react'
import { $user } from '@store'
import { useRestoreUser } from '@hooks'

export const routes = {
    home: '/home',
    games: '/games',
    gameId: '/games/:gameId',
    login: '/login',
    signup: '/signup',
}

const RouteStoreConsumer = createStoreConsumer($user)
const PrivateRoute = () => {
    return (
        <RouteStoreConsumer>
            {(user) => (user ? <Outlet /> : <Navigate to="/login" />)}
        </RouteStoreConsumer>
    )
}

const UnauthenticatedRoutes = () => {
    return (
        <RouteStoreConsumer>
            {(user) => (!user ? <Outlet /> : <Navigate to="/home" />)}
        </RouteStoreConsumer>
    )
}

export const BrowserRouter = () => {
    useRestoreUser()
    return createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route errorElement={<ErrorPage />}>
                    <Route element={<Main />}>
                        {/* Public Routes  */}
                        <Route path={routes.home} element={<Home />} />
                        {/*  */}
                        {/* Private Routes  */}
                        <Route element={<PrivateRoute />}>
                            <Route path={routes.games} element={<Games />} />
                            <Route
                                path={routes.gameId}
                                element={<GameDetail />}
                            />
                        </Route>
                        {/*  */}

                        {/* Routes that Can't be accessed if logged in  */}
                        <Route element={<UnauthenticatedRoutes />}>
                            <Route
                                path={routes.login}
                                element={<Login />}
                                action={() => null}
                            />
                            <Route
                                path={routes.signup}
                                element={<Signup />}
                                action={() => null}
                            />
                        </Route>

                        {/*  */}
                    </Route>
                </Route>
            </>
        )
    )
}
