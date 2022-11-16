import Header from '@layout/Header'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const Main: FC = () => {
    return (
        <div className="w-full h-screen" id="detail">
            <Header />
            <Outlet />
        </div>
    )
}
export default Main
