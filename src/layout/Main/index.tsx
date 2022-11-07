import { FC } from 'react'

interface IProps {
    children: JSX.Element
}
const Main: FC<IProps> = ({ children }) => {
    return <div className="w-full h-screen">{children}</div>
}
export default Main
