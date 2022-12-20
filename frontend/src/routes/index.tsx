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
import { useStore } from 'effector-react'
import { $user } from '@store'
import 'react-toastify/dist/ReactToastify.css'

export const routes = {
    home: '/home',
    games: '/games',
    gameId: '/games/:gameId',
    login: '/login',
    signup: '/signup',
}
const PrivateRoute = () => {
    const user = useStore($user)
    return user ? <Outlet /> : <Navigate to="/login" />
}

const UnauthenticatedRoutes = () => {
    const user = useStore($user)
    return !user ? <Outlet /> : <Navigate to="/home" />
}

export const BrowserRouter = () =>
    createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route errorElement={<ErrorPage />}>
                    <Route path="/" element={<Main />}>
                        {/* Public Routes  */}
                        <Route path={routes.home} element={<Home />} />
                        {/*  */}

                        {/* Private Routes  */}
                        <Route path="/" element={<PrivateRoute />}>
                            <Route
                                path={routes.games}
                                element={<Games />}
                            ></Route>
                            <Route
                                path={routes.gameId}
                                element={<GameDetail />}
                            />
                        </Route>
                        {/*  */}

                        {/* Routes that Can't be accessed if logged in  */}
                        <Route path="/" element={<UnauthenticatedRoutes />}>
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
