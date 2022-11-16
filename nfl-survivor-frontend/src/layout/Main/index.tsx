import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Main: FC = () => {
    return (
        <div className="w-full h-screen" id="detail">
            <ToastContainer />
            <Outlet />
        </div>
    )
}
export default Main
