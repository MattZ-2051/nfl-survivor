import { $user, restoreUser } from '@store'
import { useEvent, useStore } from 'effector-react'
import { FC, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRefreshToken } from '@hooks'

const Main: FC = () => {
    const restoreUserStore = useEvent(restoreUser)
    const user = useStore($user)
    useRefreshToken(user)
    useEffect(() => {
        restoreUserStore()
    }, [])

    return (
        <div className="w-full h-screen" id="detail">
            <ToastContainer position="top-center" />
            <Outlet />
        </div>
    )
}
export default Main
