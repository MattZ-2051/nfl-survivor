import { $user } from '@store'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
    useGetUserProfile,
    useRefreshToken,
    useRestoreUserOnMount,
} from '@hooks'

const Main: FC = () => {
    const user = useStore($user)
    useRefreshToken(user)
    useGetUserProfile(user)
    return (
        <div className="w-full min-h-screen bg-blue-600" id="detail">
            <ToastContainer position="top-center" pauseOnHover={false} />
            <Outlet />
        </div>
    )
}
export default Main
