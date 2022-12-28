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
import { $gameProfile, $user } from '@store'
import { useRestoreUser } from '@hooks'

export const routes = {
    home: '/home',
    games: '/games',
    gameId: '/games/:gameId',
    login: '/login',
    signup: '/signup',
}

const UserRouteStoreConsumer = createStoreConsumer($user)
const GameRouteStoreConsumer = createStoreConsumer($gameProfile)
const PrivateRoute = () => {
    return (
        <UserRouteStoreConsumer>
            {(user) => (user ? <Outlet /> : <Navigate to="/login" />)}
        </UserRouteStoreConsumer>
    )
}

const GamePrivateRoute = () => {
    return (
        <GameRouteStoreConsumer>
            {(gameProfile) =>
                gameProfile ? <Outlet /> : <Navigate to="/games" />
            }
        </GameRouteStoreConsumer>
    )
}
const UnauthenticatedRoutes = () => {
    return (
        <UserRouteStoreConsumer>
            {(user) => (!user ? <Outlet /> : <Navigate to="/home" />)}
        </UserRouteStoreConsumer>
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
                        </Route>
                        <Route element={<GamePrivateRoute />}>
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
